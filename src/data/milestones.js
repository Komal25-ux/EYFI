export const MILESTONES = [
  {
    id: "first_money",
    amount: 100,
    title: "FIRST MONEY",
    emoji: "💰",
    badge: "FIRST MONEY 💰",
    tagline: "The hardest rupee is the first rupee.",
    description: "Earn your first ₹100 from a real person/client through any legal hustle.",
    color: "#F59E0B", // Amber
    bgGradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
    iconName: "Coins",
    perk: "EYFI Verified Hustler Discord Role + Welcome Kit"
  },
  {
    id: "1k_club",
    amount: 1000,
    title: "₹1K CLUB",
    emoji: "🌟",
    badge: "₹1K CLUB 🌟",
    tagline: "Double-digit validation unlocked.",
    description: "Crossed ₹1,000 in student earnings. You've proven the model works.",
    color: "#3B82F6", // Blue
    bgGradient: "linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)",
    iconName: "Sparkles",
    perk: "Access to Weekly Mentorship AMAs with Top Earners"
  },
  {
    id: "momentum",
    amount: 5000,
    title: "MOMENTUM",
    emoji: "🚀",
    badge: "MOMENTUM 🚀",
    tagline: "Velocity is kicking in.",
    description: "₹5,000 milestone hit. Moving from one-off gigs to repeatable income streams.",
    color: "#8B5CF6", // Purple
    bgGradient: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
    iconName: "Rocket",
    perk: "Exclusive EYFI Freelancer Pitch Deck Template Pack"
  },
  {
    id: "10k_club",
    amount: 10000,
    title: "₹10K CLUB",
    emoji: "🔥",
    badge: "₹10K CLUB 🔥",
    tagline: "Five figures of pure self-made hustle.",
    description: "Crossed ₹10,000. Out-earning standard college pocket money by miles.",
    color: "#FF4522", // EYFI Brand Orange
    bgGradient: "linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)",
    iconName: "Flame",
    perk: "Feature in EYFI National Student Earning Spotlight"
  },
  {
    id: "serious_hustler",
    amount: 25000,
    title: "SERIOUS HUSTLER",
    emoji: "⚡",
    badge: "SERIOUS HUSTLER ⚡",
    tagline: "Independent income machine.",
    description: "₹25,000 achieved. Managing multiple clients, products, or high-value gigs.",
    color: "#EC4899", // Pink
    bgGradient: "linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)",
    iconName: "Zap",
    perk: "Direct intro to Startup Founders & Seed Grant access"
  },
  {
    id: "big_league",
    amount: 50000,
    title: "BIG LEAGUE",
    emoji: "🏆",
    badge: "BIG LEAGUE 🏆",
    tagline: "Top tier campus operator.",
    description: "₹50,000 earned. Running a mini-agency or high-margin product.",
    color: "#10B981", // Emerald
    bgGradient: "linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)",
    iconName: "Trophy",
    perk: "Physical Golden EYFI Trophy shipped to your campus"
  },
  {
    id: "eyfi_legend",
    amount: 100000,
    title: "EYFI LEGEND",
    emoji: "👑",
    badge: "EYFI LEGEND 👑",
    tagline: "6 Figures as a college student.",
    description: "₹1,00,000+ earned during the challenge. Indian student hall of fame status.",
    color: "#EAB308", // Gold
    bgGradient: "linear-gradient(135deg, #FEF08A 0%, #FDE047 100%)",
    iconName: "Crown",
    perk: "All-expenses-paid trip to EYFI Annual Creators Summit + Angel Angel Pitch"
  }
];

export function getMilestoneProgress(income = 0) {
  if (income <= 0) {
    return {
      currentMilestone: null,
      nextMilestone: MILESTONES[0],
      amountRemaining: MILESTONES[0].amount,
      progressPercent: 0,
      prevMilestoneAmount: 0
    };
  }

  let currentMilestone = null;
  let nextMilestone = null;

  for (let i = 0; i < MILESTONES.length; i++) {
    if (income >= MILESTONES[i].amount) {
      currentMilestone = MILESTONES[i];
    } else {
      nextMilestone = MILESTONES[i];
      break;
    }
  }

  // If passed all milestones
  if (!nextMilestone && currentMilestone) {
    return {
      currentMilestone,
      nextMilestone: null,
      amountRemaining: 0,
      progressPercent: 100,
      prevMilestoneAmount: currentMilestone.amount
    };
  }

  const prevAmount = currentMilestone ? currentMilestone.amount : 0;
  const targetAmount = nextMilestone.amount;
  const range = targetAmount - prevAmount;
  const earnedInRange = income - prevAmount;
  const progressPercent = Math.min(100, Math.max(0, Math.round((earnedInRange / range) * 100)));
  const amountRemaining = Math.max(0, targetAmount - income);

  return {
    currentMilestone,
    nextMilestone,
    amountRemaining,
    progressPercent,
    prevMilestoneAmount: prevAmount
  };
}
