import React from 'react';
import { Crown, Flame, Sparkles } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function TopPodium({ topParticipants = [], onSelectParticipant, timeFilter }) {
  if (!topParticipants || topParticipants.length < 3) return null;

  const first = topParticipants[0];
  const second = topParticipants[1];
  const third = topParticipants[2];

  const getIncome = (p) => {
    if (timeFilter === 'this_week') return p.incomeThisWeek;
    if (timeFilter === 'this_month') return p.incomeThisMonth;
    return p.incomeAllTime;
  };

  return (
    <section className="podium-section">
      <div className="section-header-row">
        <h2 className="section-title">
          <span>🔥</span> TOP EARNERS
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          Leading the movement
        </span>
      </div>

      <div className="podium-grid">
        {/* Rank 2 (Silver) */}
        {second && (
          <div 
            className="podium-card podium-rank-2"
            onClick={() => onSelectParticipant(second)}
            title="Click to view hustle details"
          >
            {/* Large centered medal emoji above avatar */}
            <div className="podium-medal-emoji">🥈</div>
            
            <div className="podium-avatar-wrapper">
              <img src={second.avatar} alt={second.name} className="podium-avatar" />
              {second.streak > 0 && (
                <div className="podium-streak-pill">
                  <Flame size={12} color="#F97316" /> {second.streak}d
                </div>
              )}
            </div>
            <h3 className="podium-name">{second.name}</h3>
            <p className="podium-college">{second.college}</p>
            <div className="podium-income">{formatINR(getIncome(second))}</div>
            <span className="podium-category-tag">{second.category}</span>
          </div>
        )}

        {/* Rank 1 (Gold - Center & Elevated) */}
        {first && (
          <div 
            className="podium-card podium-rank-1"
            onClick={() => onSelectParticipant(first)}
            title="Click to view hustle details"
          >
            {/* Large centered medal emoji above avatar */}
            <div className="podium-medal-emoji gold">🥇</div>
            
            <div className="podium-avatar-wrapper">
              <img src={first.avatar} alt={first.name} className="podium-avatar" />
              {first.streak > 0 && (
                <div className="podium-streak-pill">
                  <Flame size={12} color="#F97316" /> {first.streak}d
                </div>
              )}
            </div>
            <h3 className="podium-name">
              {first.name} <Crown size={17} color="#D97706" />
            </h3>
            <p className="podium-college">{first.college}</p>
            <div className="podium-income">{formatINR(getIncome(first))}</div>
            <span className="podium-category-tag primary">
              {first.category}
            </span>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {third && (
          <div 
            className="podium-card podium-rank-3"
            onClick={() => onSelectParticipant(third)}
            title="Click to view hustle details"
          >
            {/* Large centered medal emoji above avatar */}
            <div className="podium-medal-emoji">🥉</div>
            
            <div className="podium-avatar-wrapper">
              <img src={third.avatar} alt={third.name} className="podium-avatar" />
              {third.streak > 0 && (
                <div className="podium-streak-pill">
                  <Flame size={12} color="#F97316" /> {third.streak}d
                </div>
              )}
            </div>
            <h3 className="podium-name">{third.name}</h3>
            <p className="podium-college">{third.college}</p>
            <div className="podium-income">{formatINR(getIncome(third))}</div>
            <span className="podium-category-tag">{third.category}</span>
          </div>
        )}
      </div>
    </section>
  );
}
