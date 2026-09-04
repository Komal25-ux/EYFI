import React, { useState } from 'react';
import { X, Sparkles, Plus, TrendingUp, CheckCircle } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function EarningSimulatorModal({ isOpen, onClose, onAddEarning, currentIncome }) {
  const [customAmount, setCustomAmount] = useState('');
  const [hustleNote, setHustleNote] = useState('');

  if (!isOpen) return null;

  const handlePreset = (amount, note) => {
    onAddEarning(amount, note);
    onClose();
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    const parsed = parseFloat(customAmount);
    if (!isNaN(parsed) && parsed > 0) {
      onAddEarning(parsed, hustleNote || 'Freelance Project');
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#FF4522" />
            <h3 className="modal-title">Simulate Earning Update</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Simulate earning real money to watch your rank climb, progress bar fill, and trigger celebratory milestone unlocks!
          </p>

          <div style={{ marginBottom: '14px' }}>
            <label className="sim-input-label">Quick Presets:</label>
            <div className="simulator-presets">
              <button
                type="button"
                className="preset-btn"
                onClick={() => handlePreset(500, 'Thumbnail Design')}
              >
                <div className="preset-btn-amount">+₹500</div>
                <div className="preset-btn-label">Canva Gig</div>
              </button>

              <button
                type="button"
                className="preset-btn"
                onClick={() => handlePreset(1250, 'Notion Template Sales')}
                style={{ borderColor: '#FF4522', background: '#FFF5F3' }}
              >
                <div className="preset-btn-amount">+₹1,250</div>
                <div className="preset-btn-label">🎯 Hit ₹10K Club!</div>
              </button>

              <button
                type="button"
                className="preset-btn"
                onClick={() => handlePreset(5000, 'Webflow Landing Page')}
              >
                <div className="preset-btn-amount">+₹5,000</div>
                <div className="preset-btn-label">Client Site</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmitCustom}>
            <div className="simulator-input-group">
              <label className="sim-input-label">Or enter custom amount (₹):</label>
              <input
                type="number"
                min="1"
                step="50"
                className="sim-input-box"
                placeholder="e.g. 2000"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>

            <div className="simulator-input-group">
              <label className="sim-input-label">Hustle Note (optional):</label>
              <input
                type="text"
                className="sim-input-box"
                style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 'normal' }}
                placeholder="e.g. SEO Copywriting for startup"
                value={hustleNote}
                onChange={(e) => setHustleNote(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="journey-action-btn"
              style={{ marginBottom: 0 }}
              disabled={!customAmount || parseFloat(customAmount) <= 0}
            >
              <TrendingUp size={18} />
              <span>Log Earning & Climb Rank 🚀</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
