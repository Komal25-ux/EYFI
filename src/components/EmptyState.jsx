import React from 'react';
import { Search, Sparkles, RefreshCw } from 'lucide-react';

export default function EmptyState({ type = 'no_results', searchQuery = '', onClearSearch }) {
  if (type === 'no_results') {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">👀</div>
        <h3 className="empty-state-title">No hustler found</h3>
        <p className="empty-state-text">
          {searchQuery ? `No results matching "${searchQuery}". ` : ''}
          Try searching by another student name, college, or hustle skill.
        </p>
        {onClearSearch && (
          <button
            onClick={onClearSearch}
            className="journey-secondary-btn"
            style={{ maxWidth: '200px', margin: '0 auto' }}
          >
            <RefreshCw size={14} /> Clear Search Filter
          </button>
        )}
      </div>
    );
  }

  if (type === 'not_in_filter') {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">🚀</div>
        <h3 className="empty-state-title">Not on this week's board yet</h3>
        <p className="empty-state-text">
          You haven't made it onto this week's leaderboard yet. Your next earning could change that!
        </p>
      </div>
    );
  }

  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">💰</div>
      <h3 className="empty-state-title">YOUR FIRST ₹ IS WAITING</h3>
      <p className="empty-state-text">
        Earn ₹1 to begin your student earning journey and claim your rank.
      </p>
    </div>
  );
}
