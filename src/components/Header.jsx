import React from 'react';
import { Flame, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { USER_PROFILES } from '../data/userProfiles';

export default function Header({ currentProfile, onSelectProfile, challengeDay = 18, totalDays = 30 }) {
  return (
    <>
      {/* 1. Official EYFI Brand Announcement Marquee */}
      <div className="eyfi-top-marquee">
        <div className="marquee-track">
          <span>✦ ₹8,42,650 EARNED BY COMMUNITY</span>
          <span className="marquee-white">✦ FOR COLLEGE STUDENTS</span>
          <span>✦ DAY {challengeDay} OF {totalDays} LIVE</span>
          <span className="marquee-white">✦ INTERNSHIP OPPORTUNITIES</span>
          <span>✦ VENTURE GRANTS</span>
          <span className="marquee-white">✦ WAVE 01 LIVE</span>
          <span>✦ ₹8,42,650 EARNED BY COMMUNITY</span>
          <span className="marquee-white">✦ FOR COLLEGE STUDENTS</span>
          <span>✦ DAY {challengeDay} OF {totalDays} LIVE</span>
          <span className="marquee-white">✦ INTERNSHIP OPPORTUNITIES</span>
          <span>✦ VENTURE GRANTS</span>
          <span className="marquee-white">✦ WAVE 01 LIVE</span>
        </div>
      </div>

      {/* 2. Main Site Header */}
      <header className="site-header">
        <div className="header-inner">
          {/* Left: Brand + Day Counter */}
          <div className="logo-area">
            <a href="#" className="brand-badge-logo">
              <span>EYFI</span>.
            </a>

            <div className="challenge-pill">
              <span className="live-dot"></span>
              <span>DAY {challengeDay} / {totalDays}</span>
            </div>
          </div>

          {/* Right: Persona Switcher + Current User Info */}
          <div className="header-right">
            <div className="persona-selector">
              <UserCheck size={16} color="#F97316" />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Persona:</span>
              <select
                className="persona-select-input"
                value={currentProfile.id}
                onChange={(e) => onSelectProfile(e.target.value)}
                title="Switch persona to test different ranks and edge cases"
              >
                {USER_PROFILES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.initialIncome === 0 ? 'Zero Income / Edge Case' : p.id === 'ananya_sharma' ? '#1 Top Earner' : `#47 Active Earner`})
                  </option>
                ))}
              </select>
            </div>

            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              title={`${currentProfile.name} - ${currentProfile.college}`}
            >
              <img
                src={currentProfile.avatar}
                alt={currentProfile.name}
                className="header-user-avatar"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentProfile.name)}&background=F97316&color=fff`;
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
