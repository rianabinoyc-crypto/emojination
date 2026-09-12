import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  EmojiProfile, 
  UserProfile, 
  Match, 
  Message, 
  NotificationItem, 
  AppSettings, 
  AnalyticsStats, 
  ChatMode,
  DayHealthRecord,
  WorkoutItem,
  HealthStreaks,
  AchievementItem,
  DailyChallenge,
  GamificationState
} from './types';
import { INITIAL_EMOJI_PROFILES } from './data/emojiProfiles';
import { 
  storageService, 
  DEFAULT_USER_PROFILE, 
  DEFAULT_SETTINGS, 
  DEFAULT_ANALYTICS 
} from './services/storageService';
import { calculateCompatibility, generateRelationshipHealth } from './services/compatibilityEngine';
import { translateText } from './services/translationEngine';
import { generateSimulatedReply } from './services/simulatedChatEngine';
import { soundService } from './services/soundService';

// Components
import { Navbar } from './components/common/Navbar';
import { MobileNav } from './components/common/MobileNav';
import { LandingPage } from './components/landing/LandingPage';
import { SwipeDeck } from './components/dating/SwipeDeck';
import { MatchModal } from './components/dating/MatchModal';
import { MatchesView } from './components/matches/MatchesView';
import { ChatLayout } from './components/chat/ChatLayout';
import { HealthDashboard } from './components/health/HealthDashboard';
import { PersonalitiesView } from './components/personalities/PersonalitiesView';
import { EmojiToolsView } from './components/tools/EmojiToolsView';
import { AchievementsView } from './components/achievements/AchievementsView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { EncyclopediaView } from './components/encyclopedia/EncyclopediaView';
import { UserProfileView } from './components/profile/UserProfileView';
import { SettingsView } from './components/settings/SettingsView';

export function App() {
  // Navigation Route State
  const [currentRoute, setCurrentRoute] = useState<string>('landing');

  // Core Application Data State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => storageService.getUserProfile());
  const [acceptedIds, setAcceptedIds] = useState<string[]>(() => storageService.getAcceptedIds());
  const [rejectedIds, setRejectedIds] = useState<string[]>(() => storageService.getRejectedIds());
  const [matches, setMatches] = useState<Match[]>(() => storageService.getMatches());
  const [messages, setMessages] = useState<Record<string, Message[]>>(() => storageService.getMessages());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => storageService.getNotifications());
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());
  const [analytics, setAnalytics] = useState<AnalyticsStats>(() => storageService.getAnalytics());

  // Health Data State
  const [healthRecord, setHealthRecord] = useState<DayHealthRecord>(() => storageService.getDayHealth());
  const [workouts, setWorkouts] = useState<WorkoutItem[]>(() => storageService.getWorkouts());
  const [healthStreaks, setHealthStreaks] = useState<HealthStreaks>(() => storageService.getHealthStreaks());

  // Personalities & Dating Pool State
  const [customPersonalities, setCustomPersonalities] = useState<EmojiProfile[]>(() => storageService.getCustomPersonalities());
  const [datingPoolIds, setDatingPoolIds] = useState<Set<string>>(() => {
    const saved = storageService.getDatingPoolInclusions();
    if (saved) return new Set(saved);
    // By default, all initial emojis are included
    return new Set(INITIAL_EMOJI_PROFILES.map(p => p.id));
  });

  // Achievements & Gamification State
  const [achievements, setAchievements] = useState<AchievementItem[]>(() => storageService.getAchievements());
  const [challenges, setChallenges] = useState<DailyChallenge[]>(() => storageService.getDailyChallenges());
  const [gamification, setGamification] = useState<GamificationState>(() => storageService.getGamification());

  // Active interaction state
  const [matchedProfileForModal, setMatchedProfileForModal] = useState<EmojiProfile | null>(null);
  const [modalCompatibility, setModalCompatibility] = useState<number>(95);
  const [activeChatEmojiId, setActiveChatEmojiId] = useState<string | null>(null);
  const [typingEmojiId, setTypingEmojiId] = useState<string | null>(null);

  // Sync sound settings with sound service on load
  useEffect(() => {
    soundService.setEnabled(settings.soundEnabled);
    soundService.setVolume(settings.volume);
  }, [settings.soundEnabled, settings.volume]);

  // URL Hash Sync for browser history back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash || hash === 'landing') {
        setCurrentRoute('landing');
      } else {
        setCurrentRoute(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route === 'landing' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Combine initial profiles and user-created custom personalities
  const allPersonalities = useMemo(() => {
    return [...INITIAL_EMOJI_PROFILES, ...customPersonalities];
  }, [customPersonalities]);

  // Remaining available dating profiles (must be in dating pool AND not yet swiped)
  const availableProfiles = useMemo(() => {
    const swipedSet = new Set([...acceptedIds, ...rejectedIds]);
    return allPersonalities.filter(p => datingPoolIds.has(p.id) && !swipedSet.has(p.id));
  }, [allPersonalities, datingPoolIds, acceptedIds, rejectedIds]);

  // Gamification XP helper
  const awardXp = useCallback((amount: number, activityName: string) => {
    setGamification(prev => {
      const newTotal = prev.totalXpEarned + amount;
      let newCurrent = prev.currentXp + amount;
      let newLevel = prev.level;
      let newNext = prev.xpForNextLevel;

      while (newCurrent >= newNext) {
        newCurrent -= newNext;
        newLevel += 1;
        newNext = Math.round(newNext * 1.25);
        soundService.playMatch();
      }

      const activities = prev.contributingActivities.includes(activityName)
        ? prev.contributingActivities
        : [activityName, ...prev.contributingActivities.slice(0, 4)];

      const updated: GamificationState = {
        ...prev,
        level: newLevel,
        currentXp: newCurrent,
        xpForNextLevel: newNext,
        totalXpEarned: newTotal,
        contributingActivities: activities
      };
      storageService.saveGamification(updated);
      return updated;
    });
  }, []);

  // Reciprocal Matching & Swiping Logic
  const handleAcceptProfile = useCallback((profile: EmojiProfile) => {
    const newAccepted = [...acceptedIds, profile.id];
    setAcceptedIds(newAccepted);
    storageService.saveAcceptedIds(newAccepted);

    awardXp(10, 'Swiped on profile');

    // Update analytics
    setAnalytics(prev => {
      const updated = {
        ...prev,
        profilesAccepted: prev.profilesAccepted + 1,
        matchesFormed: prev.matchesFormed + 1
      };
      storageService.saveAnalytics(updated);
      return updated;
    });

    // Check reciprocal match
    const compatibility = calculateCompatibility(profile, userProfile);
    const doesReciprocate = Math.random() < profile.reciprocalRate || compatibility.score > 75;

    if (doesReciprocate) {
      const newMatch: Match = {
        id: `match-${profile.id}-${Date.now()}`,
        emojiId: profile.id,
        matchedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        compatibility: compatibility.score,
        relationshipHealth: generateRelationshipHealth(profile, userProfile, compatibility.score),
        unreadCount: 0
      };

      const updatedMatches = [newMatch, ...matches.filter(m => m.emojiId !== profile.id)];
      setMatches(updatedMatches);
      storageService.saveMatches(updatedMatches);

      awardXp(50, `Matched with ${profile.name}`);

      // Add Notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        type: 'match',
        title: `💕 It's a Match with ${profile.name}!`,
        message: `${profile.emoji} accepted you back with ${compatibility.score}% compatibility!`,
        timestamp: 'Just now',
        read: false,
        avatarEmoji: profile.emoji,
        linkTo: 'chat'
      };
      const updatedNotifs = [newNotif, ...notifications];
      setNotifications(updatedNotifs);
      storageService.saveNotifications(updatedNotifs);

      // Show Dramatic Match Screen
      setModalCompatibility(compatibility.score);
      setMatchedProfileForModal(profile);
    }
  }, [acceptedIds, userProfile, matches, notifications, awardXp]);

  const handleRejectProfile = useCallback((profile: EmojiProfile) => {
    const newRejected = [...rejectedIds, profile.id];
    setRejectedIds(newRejected);
    storageService.saveRejectedIds(newRejected);

    // Update analytics
    setAnalytics(prev => {
      const updated = {
        ...prev,
        profilesRejected: prev.profilesRejected + 1
      };
      storageService.saveAnalytics(updated);
      return updated;
    });
  }, [rejectedIds]);

  const handleResetDiscovery = useCallback(() => {
    setAcceptedIds([]);
    setRejectedIds([]);
    storageService.saveAcceptedIds([]);
    storageService.saveRejectedIds([]);
  }, []);

  // Sending Messages & Simulated AI Replies
  const handleSendMessage = useCallback((rawText: string, mode: ChatMode) => {
    if (!activeChatEmojiId) return;

    const partner = allPersonalities.find(p => p.id === activeChatEmojiId);
    if (!partner) return;

    // 1. Translate message according to selected mode
    const translation = translateText(rawText, mode);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeChatEmojiId,
      sender: 'user',
      text: rawText,
      translatedText: translation.translated,
      mode,
      timestamp: timeStr,
      status: 'sent',
      reactions: {},
      userReactions: [],
      translationMetadata: translation.metadata
    };

    const currentConvo = messages[activeChatEmojiId] || [];
    const updatedConvo = [...currentConvo, userMessage];
    const newMessages = { ...messages, [activeChatEmojiId]: updatedConvo };

    setMessages(newMessages);
    storageService.saveMessages(newMessages);
    soundService.playMessage();
    awardXp(15, 'Sent emoji message');

    // Update analytics
    setAnalytics(prev => {
      const emojiChars = translation.translated.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu)?.length || 3;
      const updated: AnalyticsStats = {
        ...prev,
        messagesSent: prev.messagesSent + 1,
        emojisSent: prev.emojisSent + emojiChars,
        carbonFootprintKg: Number((prev.carbonFootprintKg + 0.00000001).toFixed(8))
      };
      storageService.saveAnalytics(updated);
      return updated;
    });

    // 2. Simulated typing indicator & response delay
    const delays = {
      fast: 900,
      normal: 1800,
      dramatic: 3200
    };
    const delayMs = delays[settings.chatDelay] || 1800;

    setTypingEmojiId(activeChatEmojiId);

    setTimeout(() => {
      const replyData = generateSimulatedReply(partner, rawText);
      const replyTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // If partner reacts to user message
      let finalConvo = updatedConvo;
      if (replyData.reactionToUserMsg) {
        finalConvo = finalConvo.map(m => {
          if (m.id === userMessage.id) {
            const rx = { ...m.reactions };
            rx[replyData.reactionToUserMsg!] = (rx[replyData.reactionToUserMsg!] || 0) + 1;
            return { ...m, reactions: rx, status: 'read' as const };
          }
          return m;
        });
      }

      const partnerMessage: Message = {
        id: `msg-rep-${Date.now()}`,
        conversationId: activeChatEmojiId,
        sender: 'emoji',
        text: replyData.text,
        translatedText: replyData.translatedText || replyData.text,
        mode: 'emoji',
        timestamp: replyTimeStr,
        status: 'delivered',
        reactions: {},
        userReactions: []
      };

      const finalMessages = { ...messages, [activeChatEmojiId]: [...finalConvo, partnerMessage] };
      setMessages(finalMessages);
      storageService.saveMessages(finalMessages);
      setTypingEmojiId(null);
      soundService.playMessage();
    }, delayMs);
  }, [activeChatEmojiId, messages, settings.chatDelay, allPersonalities, awardXp]);

  // Message reaction toggling
  const handleToggleReaction = useCallback((messageId: string, reactionEmoji: string) => {
    if (!activeChatEmojiId) return;

    soundService.playReaction();

    setMessages(prev => {
      const convo = prev[activeChatEmojiId] || [];
      const updated = convo.map(msg => {
        if (msg.id === messageId) {
          const userHas = msg.userReactions?.includes(reactionEmoji);
          const currentCount = msg.reactions?.[reactionEmoji] || 0;
          const nextReactions = { ...msg.reactions };

          let nextUserReactions = msg.userReactions || [];
          if (userHas) {
            nextUserReactions = nextUserReactions.filter(r => r !== reactionEmoji);
            nextReactions[reactionEmoji] = Math.max(0, currentCount - 1);
            if (nextReactions[reactionEmoji] === 0) delete nextReactions[reactionEmoji];
          } else {
            nextUserReactions = [...nextUserReactions, reactionEmoji];
            nextReactions[reactionEmoji] = currentCount + 1;
          }

          return {
            ...msg,
            reactions: nextReactions,
            userReactions: nextUserReactions
          };
        }
        return msg;
      });

      const nextState = { ...prev, [activeChatEmojiId]: updated };
      storageService.saveMessages(nextState);
      return nextState;
    });
  }, [activeChatEmojiId]);

  // Unmatch action
  const handleUnmatch = useCallback((emojiId: string) => {
    const updated = matches.filter(m => m.emojiId !== emojiId);
    setMatches(updated);
    storageService.saveMatches(updated);
    if (activeChatEmojiId === emojiId) {
      setActiveChatEmojiId(null);
    }
  }, [matches, activeChatEmojiId]);

  // Health Handlers
  const handleUpdateHealthRecord = useCallback((updated: DayHealthRecord) => {
    setHealthRecord(updated);
    storageService.saveDayHealth(updated);
    awardXp(15, 'Logged health metrics');
  }, [awardXp]);

  const handleAddWorkout = useCallback((workout: WorkoutItem) => {
    const updated = [workout, ...workouts];
    setWorkouts(updated);
    storageService.saveWorkouts(updated);
    awardXp(40, `Completed ${workout.activity}`);
    soundService.playAccept();
  }, [workouts, awardXp]);

  const handleDeleteWorkout = useCallback((id: string) => {
    const updated = workouts.filter(w => w.id !== id);
    setWorkouts(updated);
    storageService.saveWorkouts(updated);
  }, [workouts]);

  // Personalities Handlers
  const handleToggleDatingPool = useCallback((profileId: string) => {
    setDatingPoolIds(prev => {
      const next = new Set(prev);
      if (next.has(profileId)) {
        next.delete(profileId);
      } else {
        next.add(profileId);
      }
      storageService.saveDatingPoolInclusions(Array.from(next));
      return next;
    });
    soundService.playReaction();
  }, []);

  const handleSaveCustomPersonality = useCallback((newProfile: EmojiProfile) => {
    const updated = [newProfile, ...customPersonalities];
    setCustomPersonalities(updated);
    storageService.saveCustomPersonalities(updated);

    // Also add into dating pool
    setDatingPoolIds(prev => {
      const next = new Set(prev);
      next.add(newProfile.id);
      storageService.saveDatingPoolInclusions(Array.from(next));
      return next;
    });

    awardXp(60, `Created ${newProfile.name}`);
    soundService.playAccept();
  }, [customPersonalities, awardXp]);

  // Notifications actions
  const handleMarkNotificationRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    storageService.saveNotifications(updated);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    storageService.saveNotifications([]);
  };

  // Seed demo data for instant hackathon showcase
  const handleSeedDemoData = useCallback(() => {
    const coolGuy = INITIAL_EMOJI_PROFILES.find(p => p.id === 'cool-guy') || INITIAL_EMOJI_PROFILES[0];
    const romantic = INITIAL_EMOJI_PROFILES.find(p => p.id === 'hopeless-romantic') || INITIAL_EMOJI_PROFILES[1];

    const demoMatches: Match[] = [
      {
        id: 'match-cool-guy-demo',
        emojiId: coolGuy.id,
        matchedAt: 'Today',
        compatibility: 96,
        relationshipHealth: {
          romance: 88,
          humor: 92,
          chemistry: 98,
          chaos: 84,
          communication: 90,
          diagnosis: "High chemistry detected. The algorithm recommends touching grass together."
        },
        unreadCount: 0
      },
      {
        id: 'match-romantic-demo',
        emojiId: romantic.id,
        matchedAt: 'Yesterday',
        compatibility: 94,
        relationshipHealth: {
          romance: 99,
          humor: 80,
          chemistry: 95,
          chaos: 35,
          communication: 88,
          diagnosis: "Relationship is healthy but dangerously dependent on 😂."
        },
        unreadCount: 0
      }
    ];

    const demoMessages: Record<string, Message[]> = {
      'cool-guy': [
        {
          id: 'demo-msg-1',
          conversationId: 'cool-guy',
          sender: 'emoji',
          text: coolGuy.greeting,
          translatedText: coolGuy.greeting,
          mode: 'normal',
          timestamp: '10:15 AM',
          status: 'read',
          reactions: { '🔥': 1 },
          userReactions: ['🔥']
        },
        {
          id: 'demo-msg-2',
          conversationId: 'cool-guy',
          sender: 'user',
          text: 'I love coding and gaming',
          translatedText: '❤️ 💻 🎮',
          mode: 'emoji',
          timestamp: '10:16 AM',
          status: 'read',
          reactions: { '😎': 1 },
          userReactions: [],
          translationMetadata: {
            original: 'I love coding and gaming',
            translated: '❤️ 💻 🎮',
            sentiment: { label: 'High Dopamine Energy', score: 94 },
            emojiDensity: 90,
            confidence: 96,
            tokensMatched: 4
          }
        },
        {
          id: 'demo-msg-3',
          conversationId: 'cool-guy',
          sender: 'emoji',
          text: '🎮🔥 Same. What are we playing? If it is not running at 144Hz I am not interested.',
          translatedText: '🎮🔥 Same. What are we playing? If it is not running at 144Hz I am not interested.',
          mode: 'emoji',
          timestamp: '10:17 AM',
          status: 'delivered',
          reactions: { '❤️': 1 },
          userReactions: ['❤️']
        }
      ]
    };

    setMatches(demoMatches);
    setMessages(demoMessages);
    setAcceptedIds(['cool-guy', 'hopeless-romantic']);
    setRejectedIds(['dark-humor', 'angry-emoji']);
    setAnalytics({
      ...DEFAULT_ANALYTICS,
      matchesFormed: 2,
      profilesAccepted: 4,
      profilesRejected: 2,
      messagesSent: 18,
      emojisSent: 142
    });

    storageService.saveMatches(demoMatches);
    storageService.saveMessages(demoMessages);
    storageService.saveAcceptedIds(['cool-guy', 'hopeless-romantic']);
    storageService.saveRejectedIds(['dark-humor', 'angry-emoji']);
    soundService.playAccept();
  }, []);

  const handleResetAllData = useCallback(() => {
    storageService.clearAllData();
    setUserProfile(DEFAULT_USER_PROFILE);
    setAcceptedIds([]);
    setRejectedIds([]);
    setMatches([]);
    setMessages({});
    setNotifications([]);
    setSettings(DEFAULT_SETTINGS);
    setAnalytics(DEFAULT_ANALYTICS);
    setActiveChatEmojiId(null);
    setCustomPersonalities([]);
    setDatingPoolIds(new Set(INITIAL_EMOJI_PROFILES.map(p => p.id)));
    soundService.playReject();
  }, []);

  // Compute unread message count
  const unreadMessagesCount = useMemo(() => {
    return Object.values(messages).reduce((acc, convo) => {
      const unreadInConvo = convo.filter(m => m.sender === 'emoji' && m.status !== 'read').length;
      return acc + (unreadInConvo > 0 ? 1 : 0);
    }, 0);
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* LANDING PAGE (Minimal ecosystem entrance, strictly NO previews of dating/chat) */}
      {currentRoute === 'landing' ? (
        <LandingPage
          onNavigate={(route) => {
            if (route === 'chat' && matches.length > 0) {
              setActiveChatEmojiId(matches[0].emojiId);
            }
            navigateTo(route);
          }}
        />
      ) : (
        /* MAIN APPLICATION SUITE */
        <>
          <Navbar
            activeTab={currentRoute}
            setActiveTab={navigateTo}
            matchesCount={matches.length}
            unreadMessagesCount={unreadMessagesCount}
            userProfile={userProfile}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            onClearNotifications={handleClearNotifications}
            soundEnabled={settings.soundEnabled}
            onToggleSound={() => {
              const next = !settings.soundEnabled;
              soundService.setEnabled(next);
              if (next) soundService.playAccept();
              const updated = { ...settings, soundEnabled: next };
              setSettings(updated);
              storageService.saveSettings(updated);
            }}
            onGoHome={() => navigateTo('landing')}
          />

          <div className="flex-1 pb-20 lg:pb-6">
            {/* 💘 DATING */}
            {currentRoute === 'dating' && (
              <SwipeDeck
                availableProfiles={availableProfiles}
                userProfile={userProfile}
                onAccept={handleAcceptProfile}
                onReject={handleRejectProfile}
                onResetDiscovery={handleResetDiscovery}
              />
            )}

            {/* 💕 MATCHES */}
            {currentRoute === 'matches' && (
              <MatchesView
                matches={matches}
                profiles={allPersonalities}
                messages={messages}
                onOpenChat={(emojiId) => {
                  setActiveChatEmojiId(emojiId);
                  navigateTo('chat');
                }}
                onUnmatch={handleUnmatch}
                onGoDating={() => navigateTo('dating')}
              />
            )}

            {/* 💬 CHAT */}
            {currentRoute === 'chat' && (
              <ChatLayout
                matches={matches}
                profiles={allPersonalities}
                messages={messages}
                activeEmojiId={activeChatEmojiId || (matches[0]?.emojiId ?? null)}
                onSelectConversation={(id) => setActiveChatEmojiId(id)}
                onSendMessage={handleSendMessage}
                onToggleReaction={handleToggleReaction}
                typingEmojiId={typingEmojiId}
                onGoDating={() => navigateTo('dating')}
                defaultChatMode={settings.defaultChatMode}
              />
            )}

            {/* ❤️ HEALTH */}
            {currentRoute === 'health' && (
              <HealthDashboard
                healthRecord={healthRecord}
                workouts={workouts}
                streaks={healthStreaks}
                onUpdateHealthRecord={handleUpdateHealthRecord}
                onAddWorkout={handleAddWorkout}
                onDeleteWorkout={handleDeleteWorkout}
                onUpdateStreaks={(st) => {
                  setHealthStreaks(st);
                  storageService.saveHealthStreaks(st);
                }}
              />
            )}

            {/* 🧠 PERSONALITIES */}
            {currentRoute === 'personalities' && (
              <PersonalitiesView
                allPersonalities={allPersonalities}
                datingPoolIds={datingPoolIds}
                onToggleDatingPool={handleToggleDatingPool}
                onSaveCustomPersonality={handleSaveCustomPersonality}
                onGoDating={() => navigateTo('dating')}
              />
            )}

            {/* 🎨 TOOLS */}
            {currentRoute === 'tools' && (
              <EmojiToolsView />
            )}

            {/* 🏆 ACHIEVEMENTS */}
            {currentRoute === 'achievements' && (
              <AchievementsView
                achievements={achievements}
                challenges={challenges}
                gamification={gamification}
              />
            )}

            {/* 📖 ENCYCLOPEDIA */}
            {currentRoute === 'encyclopedia' && (
              <EncyclopediaView profiles={allPersonalities} />
            )}

            {/* 📊 ANALYTICS */}
            {currentRoute === 'analytics' && (
              <AnalyticsDashboard stats={analytics} />
            )}

            {/* 👤 PROFILE */}
            {currentRoute === 'profile' && (
              <UserProfileView
                userProfile={userProfile}
                stats={analytics}
                gamification={gamification}
                healthScore={healthRecord.healthScore}
                achievementsCount={achievements.filter(a => a.unlocked).length}
                totalAchievements={achievements.length}
                onUpdateProfile={(updated) => {
                  setUserProfile(updated);
                  storageService.saveUserProfile(updated);
                  soundService.playAccept();
                }}
              />
            )}

            {/* ⚙️ SETTINGS */}
            {currentRoute === 'settings' && (
              <SettingsView
                settings={settings}
                onUpdateSettings={(updated) => {
                  setSettings(updated);
                  storageService.saveSettings(updated);
                }}
                onResetAllData={handleResetAllData}
                onSeedDemoData={handleSeedDemoData}
              />
            )}
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileNav
            activeTab={currentRoute}
            setActiveTab={navigateTo}
            matchesCount={matches.length}
            unreadMessagesCount={unreadMessagesCount}
            onGoHome={() => navigateTo('landing')}
          />

          {/* Dramatic Reciprocal Match Celebration Modal */}
          {matchedProfileForModal && (
            <MatchModal
              matchedProfile={matchedProfileForModal}
              userProfile={userProfile}
              compatibilityScore={modalCompatibility}
              onStartChat={() => {
                setActiveChatEmojiId(matchedProfileForModal.id);
                setMatchedProfileForModal(null);
                navigateTo('chat');
              }}
              onKeepSwiping={() => setMatchedProfileForModal(null)}
            />
          )}
        </>
      )}

    </div>
  );
}

export default App;
