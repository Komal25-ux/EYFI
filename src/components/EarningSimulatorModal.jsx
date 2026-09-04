import React, { useState } from 'react';
import { X, Sparkles, TrendingUp } from 'lucide-react';
import { formatINR } from '../utils/formatters';

export default function EarningSimulatorModal({ isOpen, onClose, onAddEarning, currentIncome }) {
  const [customAmount, setCustomAmount] = useState('');
  const [hustleNote, setHustleNote] = useState('');
  const [activePreset, setActivePreset] = useState(null);

  if (!isOpen) return null;

  const handlePresetSelect = (amount, note, presetKey) => {
    setActivePreset(presetKey);
    setCustomAmount(amount.toString());
    setHustleNote(note);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanStr = customAmount.toString().replace(/,/g, '').trim();
    const parsed = parseFloat(cleanStr);
    if (!isNaN(parsed) && parsed > 0) {
      onAddEarning(parsed, hustleNote.trim() || 'Freelance Project');
      setCustomAmount('');
      setHustleNote('');
      setActivePreset(null);
      onClose();
    }
  };

  const isValidAmount = Boolean(
    customAmount && 
    !isNaN(parseFloat(customAmount.toString().replace(/,/g, '').trim())) && 
    parseFloat(customAmount.toString().replace(/,/g, '').trim()) > 0
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#F97316" />
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
            <label className="sim-input-label">Quick Presets (click to select & customize):</label>
            <div className="simulator-presets">
              <button
                type="button"
                className="preset-btn"
                style={activePreset === '500' ? { borderColor: '#F97316', background: '#FFF7ED' } : {}}
                onClick={() => handlePresetSelect(500, 'Canva Thumbnail Gig', '500')}
              >
                <div className="preset-btn-amount">+₹500</div>
                <div className="preset-btn-label">Canva Gig</div>
              </button>

              <button
                type="button"
                className="preset-btn"
                style={activePreset === '1250' ? { borderColor: '#F97316', background: '#FFF7ED' } : {}}
                onClick={() => handlePresetSelect(1250, 'Notion Template Sales', '1250')}
              >
                <div className="preset-btn-amount">+₹1,250</div>
                <div className="preset-btn-label">🎯 Hit ₹10K Club!</div>
              </button>

              <button
                type="button"
                className="preset-btn"
                style={activePreset === '5000' ? { borderColor: '#F97316', background: '#FFF7ED' } : {}}
                onClick={() => handlePresetSelect(5000, 'Webflow Client Project', '5000')}
              >
                <div className="preset-btn-amount">+₹5,000</div>
                <div className="preset-btn-label">Client Site</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="simulator-input-group">
              <label className="sim-input-label">Enter income amount (₹):</label>
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                className="sim-input-box"
                value={customAmount}
                onChange={(e) => {
                  setActivePreset(null);
                  setCustomAmount(e.target.value);
                }}
                autoFocus
              />
            </div>

            <div className="simulator-input-group">
              <label className="sim-input-label">Hustle Note (optional):</label>
              <input
                type="text"
                className="sim-input-box"
                style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 'normal' }}
                placeholder="e.g. SEO Copywriting, UI Design, Tutoring..."
                value={hustleNote}
                onChange={(e) => setHustleNote(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="journey-action-btn"
              style={{ marginBottom: 0, opacity: isValidAmount ? 1 : 0.5, cursor: isValidAmount ? 'pointer' : 'not-allowed' }}
              disabled={!isValidAmount}
            >
              <TrendingUp size={18} />
              <span>
                {isValidAmount 
                  ? `Log ${formatINR(parseFloat(customAmount.toString().replace(/,/g, '')))} & Climb Rank 🚀` 
                  : 'Log Earning & Climb Rank 🚀'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
