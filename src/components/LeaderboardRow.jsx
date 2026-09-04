import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Minus, Sparkles, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function LeaderboardRow({
  participant,
  rank,
  income,
  movement,
  isCurrentUser,
  onSelectParticipant
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Render rank movement badge
  const renderMovement = () => {
    if (movement === 'NEW') {
      return (
        <span className="movement-badge movement-new">
          <Sparkles size={11} /> NEW
        </span>
      );
    }
    const num = Number(movement);
    if (isNaN(num) || num === 0) {
      return (
        <span className="movement-badge movement-neutral">
          <Minus size={11} />
        </span>
      );
    }
    if (num > 0) {
      return (
        <span className="movement-badge movement-up">
          <ArrowUp size={11} /> {num}
        </span>
      );
    }
    return (
      <span className="movement-badge movement-down">
        <ArrowDown size={11} /> {Math.abs(num)}
      </span>
    );
  };

  // Rank display styling
  const getRankClass = () => {
    if (rank === 1) return 'rank-top-1';
    if (rank === 2) return 'rank-top-2';
    if (rank === 3) return 'rank-top-3';
    return '';
  };

  const formatRank = (r) => {
    if (r < 10) return `0${r}`;
    return `${r}`;
  };

  return (
    <>
      <div
        className={`leaderboard-row ${isCurrentUser ? 'is-current-user' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Click to view hustle details"
      >
        {/* 1. Rank */}
        <div className={`rank-cell ${getRankClass()}`}>
          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : formatRank(rank)}
        </div>

        {/* 2. Participant Info */}
        <div className="participant-cell">
          <img
            src={participant.avatar}
            alt={participant.name}
            className="participant-avatar-thumb"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=FF4522&color=fff`;
            }}
          />
          <div className="participant-info">
            <div className="participant-name-row">
              <span>{participant.name}</span>
              {isCurrentUser && <span className="you-badge">YOU</span>}
              {participant.streak >= 4 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.72rem', color: '#D97706', fontWeight: '800' }}>
                  <Flame size={12} fill="#FFB703" color="#D97706" /> {participant.streak}d
                </span>
              )}
            </div>
            <div className="participant-sub-row">
              <span className="participant-college-tag">{participant.college}</span>
              <span>•</span>
              <span>{participant.category}</span>
            </div>
          </div>
        </div>

        {/* 3. Income */}
        <div className="income-cell">
          {formatINR(income)}
        </div>

        {/* 4. Movement */}
        <div className="movement-cell">
          {renderMovement()}
        </div>
      </div>

      {/* Expandable Accordion Row Details */}
      {isExpanded && (
        <div className="row-expanded-details">
          <div>
            <div className="detail-block-label">Started With</div>
            <div className="detail-block-val">{participant.startedWith || participant.category}</div>
          </div>

          <div>
            <div className="detail-block-label">Current Streak</div>
            <div className="detail-block-val" style={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={14} fill="#FFB703" /> {participant.streak || 1} Days Active
            </div>
          </div>

          <div>
            <div className="detail-block-label">Recent Milestone</div>
            <div className="detail-block-val" style={{ color: '#FF4522' }}>
              {participant.recentMilestone || 'FIRST MONEY 💰'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectParticipant(participant);
              }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
            >
              View Full Story →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
