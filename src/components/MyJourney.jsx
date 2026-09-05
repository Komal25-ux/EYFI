import React from 'react';
import { Rocket, Trophy, PlusCircle, Map, Flame, Sparkles, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { getMilestoneProgress } from '../data/milestones';
import NearbyCompetitors from './NearbyCompetitors';

export default function MyJourney({
  currentUser,
  currentIncome,
  userRank,
  scope,
  allParticipants,
  timeFilter,
  onOpenSimulator,
  onOpenRoadmap
}) {
  const isZeroIncome = currentIncome <= 0;
  const progressInfo = getMilestoneProgress(currentIncome);
  const { currentMilestone, nextMilestone, amountRemaining, progressPercent } = progressInfo;

  const scopeLabel = scope === 'my_college' ? 'IN DELHI' : 'IN INDIA';

  return (
    <aside className="journey-sidebar">
      <div className="journey-card">
        {/* Header */}
        <div className="journey-header">
          <div className="journey-badge">
            <Rocket size={14} />
            <span>YOUR JOURNEY 🚀</span>
          </div>

          {currentUser.streak > 0 && (
            <span style={{ fontSize: '0.76rem', color: '#D97706', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Flame size={13} fill="#FFB703" /> {currentUser.streak}-Day Streak
            </span>
          )}
        </div>

        {/* User Profile Overview */}
        <div className="journey-user-profile">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="journey-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=FF4522&color=fff`;
            }}
          />
          <div>
            <h3 className="journey-user-name">{currentUser.name}</h3>
            <p className="journey-user-college">{currentUser.college}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="journey-stats-grid">
          <div className="journey-stat-box">
            <div className="stat-box-label">Your Rank</div>
            <div className="stat-box-val highlight">
              {isZeroIncome ? 'UNRANKED' : `#${userRank || 47}`}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>
              {scopeLabel}
            </div>
          </div>

          <div className="journey-stat-box">
            <div className="stat-box-label">Total Earned</div>
            <div className="stat-box-val">
              {formatINR(currentIncome)}
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '700' }}>
              {currentUser.category?.split('+')[0] || 'Hustler'}
            </div>
          </div>
        </div>

        {/* Milestone Progress or Zero Income State */}
        {isZeroIncome ? (
          <div className="milestone-progress-card" style={{ borderColor: '#FF4522', background: '#FFF5F3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={16} color="#FF4522" />
              <strong style={{ fontSize: '0.88rem', color: '#FF4522' }}>YOUR FIRST ₹ IS WAITING 💰</strong>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Earn ₹100 from any student gig or sale to unlock your rank and claim the First Money badge!
            </p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '0%' }}></div>
            </div>
          </div>
        ) : (
          <div className="milestone-progress-card">
            <div className="milestone-header-row">
              <div className="milestone-target-name">
                <span>{nextMilestone?.emoji || '🏆'}</span>
                <span>{nextMilestone ? nextMilestone.badge : 'ALL MILESTONES UNLOCKED!'}</span>
              </div>
              <span className="milestone-percent-pill">{progressPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="progress-subtext">
              {nextMilestone ? (
                <span>
                  <strong>{formatINR(amountRemaining)}</strong> away from {formatINR(nextMilestone.amount)}
                </span>
              ) : (
                <span>You are an EYFI Legend 👑</span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <button className="journey-action-btn" onClick={onOpenSimulator}>
          <PlusCircle size={18} />
          <span>Log New Earning (Simulate)</span>
        </button>

        <button className="journey-secondary-btn" onClick={onOpenRoadmap}>
          <Map size={16} />
          <span>View 7 Milestones Roadmap</span>
        </button>
      </div>

      {/* Nearby Competitors Widget */}
      <NearbyCompetitors
        allParticipants={allParticipants}
        currentUser={currentUser}
        currentIncome={currentIncome}
        userRank={userRank}
        timeFilter={timeFilter}
      />
    </aside>
  );
}
