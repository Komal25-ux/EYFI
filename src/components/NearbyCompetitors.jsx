import React from 'react';
import { Target, Users, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function NearbyCompetitors({
  allParticipants = [],
  currentUser,
  currentIncome = 0,
  userRank = 47,
  timeFilter = 'all_time'
}) {
  if (!allParticipants || allParticipants.length === 0) return null;

  const getIncome = (p) => {
    if (timeFilter === 'this_week') return p.incomeThisWeek;
    if (timeFilter === 'this_month') return p.incomeThisMonth;
    return p.incomeAllTime;
  };

  // Find index of current user or user rank
  const userIdx = allParticipants.findIndex(
    (p) => p.id === currentUser.id || p.isCurrentUser
  );

  // If user has zero earnings or not ranked, show motivational banner
  if (currentIncome <= 0 || userIdx === -1) {
    return (
      <div className="nearby-card">
        <div className="nearby-card-title">
          <span>🎯 NEARBY COMPETITORS</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--eyfi-brand)', fontWeight: '700' }}>UNLOCK RANK</span>
        </div>
        <div style={{ textAlign: 'center', padding: '12px 6px' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Earn your first <strong>₹100</strong> to enter the ranked leaderboard and compete with nearby college students!
          </p>
        </div>
      </div>
    );
  }

  // Slice nearby participants (e.g. 2 above and 2 below)
  const startIdx = Math.max(0, userIdx - 2);
  const endIdx = Math.min(allParticipants.length, userIdx + 3);
  const slice = allParticipants.slice(startIdx, endIdx);

  return (
    <div className="nearby-card">
      <div className="nearby-card-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Target size={15} color="#FF4522" /> NEARBY RIVALS
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Achievable Goals
        </span>
      </div>

      <div className="nearby-list">
        {slice.map((p, idx) => {
          const itemRank = startIdx + idx + 1;
          const isYou = p.id === currentUser.id || p.isCurrentUser;
          const pIncome = getIncome(p);
          const gap = pIncome - currentIncome;

          return (
            <div
              key={p.id || idx}
              className={`nearby-item ${isYou ? 'is-you' : ''}`}
            >
              <div className="nearby-left">
                <span className="nearby-rank">#{itemRank}</span>
                <span className="nearby-name">
                  {isYou ? 'YOU' : p.name.split(' ')[0]}
                </span>
              </div>

              <div className="nearby-right">
                <span className="nearby-income">{formatINR(pIncome)}</span>
                {!isYou && gap > 0 && (
                  <span className="nearby-gap-badge" title={`Earn ${formatINR(gap + 50)} more to overtake`}>
                    +{formatINR(gap)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
