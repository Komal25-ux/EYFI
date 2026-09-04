import React, { useState } from 'react';
import LeaderboardRow from './LeaderboardRow';
import EmptyState from './EmptyState';

export default function LeaderboardList({
  participants = [],
  currentUserId,
  timeFilter,
  onSelectParticipant,
  searchQuery,
  onClearSearch
}) {
  const [displayLimit, setDisplayLimit] = useState(25);

  const getIncome = (p) => {
    if (timeFilter === 'this_week') return p.incomeThisWeek;
    if (timeFilter === 'this_month') return p.incomeThisMonth;
    return p.incomeAllTime;
  };

  const getMovement = (p) => {
    if (timeFilter === 'this_week') return p.movementThisWeek;
    if (timeFilter === 'this_month') return p.movementThisMonth;
    return p.movementAllTime;
  };

  if (participants.length === 0) {
    return (
      <EmptyState
        type="no_results"
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
      />
    );
  }

  const visibleParticipants = participants.slice(0, displayLimit);
  const hasMore = participants.length > displayLimit;

  return (
    <div className="table-card">
      <div className="table-header">
        <div>RANK</div>
        <div>PARTICIPANT</div>
        <div style={{ textAlign: 'right', paddingRight: '12px' }}>INCOME</div>
        <div style={{ textAlign: 'right' }}>MOVEMENT</div>
      </div>

      <div className="table-body">
        {visibleParticipants.map((participant, index) => {
          const rank = index + 1;
          const isCurrentUser = participant.id === currentUserId || participant.isCurrentUser;
          const income = getIncome(participant);
          const movement = getMovement(participant);

          return (
            <LeaderboardRow
              key={participant.id || index}
              participant={participant}
              rank={rank}
              income={income}
              movement={movement}
              isCurrentUser={isCurrentUser}
              onSelectParticipant={onSelectParticipant}
            />
          );
        })}
      </div>

      {hasMore && (
        <div style={{ padding: '16px', textAlign: 'center', background: 'var(--bg-card-secondary)', borderTop: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setDisplayLimit((prev) => prev + 25)}
            style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--border-light)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 20px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: '700',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            Show Next 25 Hustlers ({participants.length - displayLimit} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
