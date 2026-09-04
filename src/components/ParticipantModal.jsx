import React from 'react';
import { X, Flame, Award, Building2, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function ParticipantModal({ participant, isOpen, onClose, timeFilter }) {
  if (!isOpen || !participant) return null;

  const getIncome = (p) => {
    if (timeFilter === 'this_week') return p.incomeThisWeek;
    if (timeFilter === 'this_month') return p.incomeThisMonth;
    return p.incomeAllTime;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#FF4522" />
            <h3 className="modal-title">Hustler Profile</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <img
              src={participant.avatar}
              alt={participant.name}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--eyfi-brand)'
              }}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=FF4522&color=fff`;
              }}
            />
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800' }}>{participant.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Building2 size={14} />
                <span>{participant.college}</span>
              </div>
              {participant.city && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <MapPin size={12} />
                  <span>{participant.city}</span>
                </div>
              )}
            </div>
          </div>

          <div className="journey-stats-grid" style={{ marginBottom: '16px' }}>
            <div className="journey-stat-box">
              <div className="stat-box-label">Challenge Earnings</div>
              <div className="stat-box-val highlight">
                {formatINR(getIncome(participant))}
              </div>
            </div>

            <div className="journey-stat-box">
              <div className="stat-box-label">Current Streak</div>
              <div className="stat-box-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={18} fill="#FFB703" color="#D97706" /> {participant.streak || 1} Days
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card-secondary)', borderRadius: 'var(--radius-md)', padding: '14px', marginBottom: '16px' }}>
            <div className="detail-block-label">Hustle Category</div>
            <div style={{ fontWeight: '700', fontSize: '0.92rem', marginBottom: '10px' }}>
              {participant.category}
            </div>

            <div className="detail-block-label">Started With</div>
            <div style={{ fontWeight: '600', fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              {participant.startedWith || participant.category}
            </div>

            <div className="detail-block-label">Bio & Hustle Story</div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {participant.bio || "Active participant in the 30-Day EYFI Challenge, building independent earning skills."}
            </p>
          </div>

          {participant.recentMilestone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#FFFDF8', border: '1px solid #FDE68A', borderRadius: 'var(--radius-md)' }}>
              <Award size={18} color="#D97706" />
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#92400E' }}>
                Unlocked Milestone: {participant.recentMilestone}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
