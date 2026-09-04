import React from 'react';
import { X, CheckCircle2, Lock, Gift, Award, Sparkles } from 'lucide-react';
import { MILESTONES } from '../data/milestones';
import { formatINR } from '../utils/formatters';

export default function MilestoneRoadmap({ isOpen, onClose, currentIncome = 0 }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="#FF4522" />
            <h3 className="modal-title">EYFI Milestone Roadmap</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Every rupee unlocks social recognition, exclusive resources, and campus perks. You've earned <strong>{formatINR(currentIncome)}</strong> so far.
          </p>

          <div className="milestone-timeline">
            {MILESTONES.map((m) => {
              const isUnlocked = currentIncome >= m.amount;
              const isCurrentTarget = !isUnlocked && (currentIncome < m.amount) && (
                MILESTONES.findIndex((x) => x.id === m.id) === 0 ||
                currentIncome >= MILESTONES[MILESTONES.findIndex((x) => x.id === m.id) - 1]?.amount
              );

              return (
                <div
                  key={m.id}
                  className={`milestone-timeline-item ${
                    isUnlocked ? 'unlocked' : isCurrentTarget ? 'current-target' : 'locked'
                  }`}
                >
                  <div className="milestone-timeline-icon">
                    {isUnlocked ? (
                      <CheckCircle2 size={22} color="#10B981" />
                    ) : isCurrentTarget ? (
                      <Sparkles size={20} color="#FF4522" />
                    ) : (
                      <Lock size={18} color="var(--text-muted)" />
                    )}
                  </div>

                  <div className="milestone-timeline-content">
                    <div className="milestone-timeline-title-row">
                      <span className="milestone-timeline-title">
                        {m.badge}
                      </span>
                      <span className="milestone-timeline-amount">
                        {formatINR(m.amount)}
                      </span>
                    </div>

                    <p className="milestone-timeline-desc">{m.description}</p>

                    <div className="milestone-timeline-perk">
                      <Gift size={13} />
                      <span>{m.perk}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
