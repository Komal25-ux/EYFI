import React from 'react';
import { Zap, Trophy } from 'lucide-react';

export default function LeaderboardHero() {
  return (
    <section className="hero-section">
      <div className="hero-tagline-badge">
        <Zap size={14} />
        <span>EARN. CLIMB. PROVE IT.</span>
      </div>

      <h1 className="hero-title">
        YOUR FIRST INCOME <br />
        <span className="gradient-text">LEADERBOARD 🏆</span>
      </h1>

      <p className="hero-subtitle">
        India's student earning movement. Celebrating first rupee milestones, high performers, 
        and real hustle across 100+ campuses nationwide.
      </p>
    </section>
  );
}
