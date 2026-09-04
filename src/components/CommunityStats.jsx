import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Users, School } from 'lucide-react';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="community-banner">
      <div className="community-left">
        <span className="community-label">Total Impact So Far</span>
        <div className="community-amount">
          <span className="highlight-gold">{formatINR(totalCommunityIncome)}</span>
        </div>
        <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600' }}>
          EARNED BY THE EYFI STUDENT COMMUNITY SO FAR
        </span>
      </div>

      <div className="community-right">
        <div className="community-stat-item">
          <span className="stat-item-num">1,480+</span>
          <span className="stat-item-label">Student Hustlers</span>
        </div>

        <div className="community-stat-item">
          <span className="stat-item-num">64</span>
          <span className="stat-item-label">Campuses</span>
        </div>

        <div className="live-activity-ticker">
          <Sparkles size={16} color="#FFB703" />
          <span>{RECENT_ACTIVITIES[activityIndex]}</span>
        </div>
      </div>
    </div>
  );
}
