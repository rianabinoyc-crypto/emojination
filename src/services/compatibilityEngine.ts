import { EmojiProfile, UserProfile, CompatibilityBreakdown, RelationshipHealth } from '../types';

export function calculateCompatibility(
  target: EmojiProfile,
  user: UserProfile
): CompatibilityBreakdown {
  // Factor 1: Personality alignment / complementarity
  const confidenceDiff = Math.abs(target.confidence - user.stats.confidence);
  const personalityScore = Math.max(20, 100 - confidenceDiff * 0.7);

  // Factor 2: Interest intersection
  const targetInterests = target.interests.map(i => i.toLowerCase());
  const userInterests = user.interests.map(i => i.toLowerCase());
  const sharedInterests = targetInterests.filter(ti => 
    userInterests.some(ui => ti.includes(ui) || ui.includes(ti))
  );
  const interestScore = Math.min(100, 50 + sharedInterests.length * 25);

  // Factor 3: Emotional stability resonance
  const emotionalDiff = Math.abs(target.emotionalStability - user.stats.emotionalStability);
  const emotionalScore = Math.max(30, 100 - emotionalDiff * 0.8);

  // Factor 4: Humor resonance
  const humorDiff = Math.abs(target.humor - user.stats.humor);
  const humorScore = Math.max(25, 100 - humorDiff * 0.65);

  // Factor 5: Romance compatibility
  const romanceMean = (target.romance + user.stats.romance) / 2;
  const romanceDiff = Math.abs(target.romance - user.stats.romance);
  const romanceScore = Math.max(35, Math.min(100, romanceMean - romanceDiff * 0.3));

  // Factor 6: Chaos resonance
  // High chaos + high chaos = chaotic explosion (fun!), Low chaos + low chaos = calm harmony
  const avgChaos = (target.chaos + user.stats.chaos) / 2;
  const chaosScore = Math.min(100, Math.max(30, 70 + (avgChaos > 60 ? 20 : -10)));

  // Factor 7: Communication / Social energy
  const socialAvg = (target.socialEnergy + user.stats.socialEnergy) / 2;
  const commScore = Math.min(100, Math.max(40, socialAvg));

  // Weighted sum
  const weights = {
    personality: 0.18,
    interests: 0.16,
    emotional: 0.14,
    humor: 0.16,
    romance: 0.16,
    chaos: 0.10,
    communication: 0.10
  };

  const rawScore = 
    personalityScore * weights.personality +
    interestScore * weights.interests +
    emotionalScore * weights.emotional +
    humorScore * weights.humor +
    romanceScore * weights.romance +
    chaosScore * weights.chaos +
    commScore * weights.communication;

  // Normalize between 68 and 99 for fun dating app dopamine!
  const finalScore = Math.min(99, Math.max(64, Math.round(rawScore)));

  // Generate humorous commentary based on the top traits
  let summary = '';
  let verdict = '';

  if (target.chaos > 75 && user.stats.chaos > 60) {
    summary = `You both possess dangerously elevated chaos metrics and an unhealthy appreciation for unhandled exceptions.`;
    verdict = `High Probability of Burning Down a Server`;
  } else if (target.romance > 80 && user.stats.romance > 75) {
    summary = `Astronomical romantic symmetry detected. Your combined pheromone simulation is overloading our neural weights.`;
    verdict = `Wedding in the Metaverse Imminent`;
  } else if (target.humor > 85) {
    summary = `Humor compatibility is off the charts. Any serious conversation will immediately disintegrate into meme warfare.`;
    verdict = `Permanent Laugh-Cry Loop`;
  } else if (target.confidence > 85 && user.stats.confidence > 80) {
    summary = `Two high-status emojis entering the same coordinate space. Mirror selfies and mutual admiration guaranteed.`;
    verdict = `Unbothered Power Couple`;
  } else {
    summary = `Algorithmic affinity is stable. Compatible emotional bandwidth with minimal risk of immediate digital meltdown.`;
    verdict = `Certified Algorithmic Match`;
  }

  return {
    score: finalScore,
    factors: {
      personality: Math.round(personalityScore),
      interests: Math.round(interestScore),
      emotional: Math.round(emotionalScore),
      humor: Math.round(humorScore),
      romance: Math.round(romanceScore),
      chaos: Math.round(chaosScore),
      communication: Math.round(commScore)
    },
    summary,
    verdict
  };
}

export function generateRelationshipHealth(
  target: EmojiProfile,
  user: UserProfile,
  compatibilityScore: number
): RelationshipHealth {
  const romance = Math.min(99, Math.max(45, Math.round((target.romance + user.stats.romance) / 2 + (compatibilityScore > 85 ? 8 : -5))));
  const humor = Math.min(98, Math.max(50, Math.round((target.humor + user.stats.humor) / 2 + 5)));
  const chemistry = Math.min(99, Math.max(60, Math.round(compatibilityScore + Math.floor(Math.random() * 6))));
  const chaos = Math.min(99, Math.max(20, Math.round((target.chaos + user.stats.chaos) / 2 + 10)));
  const communication = Math.min(97, Math.max(55, Math.round((target.socialEnergy + user.stats.socialEnergy) / 2)));

  let diagnosis = "Relationship is healthy but dangerously dependent on 😂.";
  if (chemistry > 90) {
    diagnosis = "High chemistry detected. The algorithm recommends touching grass together.";
  } else if (chaos > 80) {
    diagnosis = "Warning: Chaos index is hazardous. Keep digital fire extinguishers within reach.";
  } else if (romance > 90) {
    diagnosis = "Excessive romantic sweetness detected. Risk of dental cavities in neural nets.";
  }

  return {
    romance,
    humor,
    chemistry,
    chaos,
    communication,
    diagnosis
  };
}
