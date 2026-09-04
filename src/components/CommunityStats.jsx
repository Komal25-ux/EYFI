import React, { useState, useEffect } from 'react';
import { Sparkles, Users, School, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../utils/formatters';

const RECENT_ACTIVITIES = [
  "⚡ Ananya Sharma just logged ₹4,500 for UI/UX Sprint",
  "🚀 Siddharth Rao passed Rank #46 (+₹1,200)",
  "🎉 Devansh Patel unlocked MOMENTUM 🚀 Milestone",
  "💡 Roshni Patel made her FIRST MONEY 💰 (₹250)",
  "🔥 Komal Mittal reached 87.5% of the ₹10K Club"
];

export default function CommunityStats({ totalCommunityIncome = 842650 }) {
  const [activityIndex, setActivityIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);

  // Rotating activity ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // Smooth number ticker counting up to totalCommunityIncome
  useEffect(() => {
    let start = Math.max(0, totalCommunityIncome - 40000);
    const duration = 1200; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (totalCommunityIncome - start) / steps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalCommunityIncome) {
        setDisplayCount(totalCommunityIncome);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [totalCommunityIncome]);

  return (
    <div className="community-banner">
      <div className="community-left">
        <div className="community-label-row">
          <span className="community-pulse-dot"></span>
          <span className="community-label">Total Student Impact</span>
        </div>
        
        <div className="community-amount">
          <span className="community-amount-num">{formatINR(displayCount)}</span>
        </div>
        
        <span className="community-subtext">
          EARNED BY THE EYFI COLLEGE COMMUNITY SO FAR
        </span>
      </div>

      <div className="community-right">
        <div className="community-stat-item">
          <span className="stat-item-num">1,480+</span>
          <span className="stat-item-label">Active Hustlers</span>
        </div>

        <div className="community-stat-divider"></div>

        <div className="community-stat-item">
          <span className="stat-item-num">64</span>
          <span className="stat-item-label">Campuses</span>
        </div>

        <div className="community-stat-divider"></div>

        <div className="live-activity-ticker">
          <Sparkles size={15} color="#F97316" />
          <span>{RECENT_ACTIVITIES[activityIndex]}</span>
        </div>
      </div>
    </div>
  );
}
