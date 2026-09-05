# EYFI Challenge — Leaderboard

An interactive leaderboard experience designed for the **EYFI (Earn Your First Income) Challenge**, with a focus on making progress, earnings, rankings, and personal growth engaging for college students.

## 🔗 Links

- **Live Demo:** https://eyfi-leaderboard-nu.vercel.app/
- **GitHub Repository:** https://github.com/Komal25-ux/EYFI

## 🎯 Assignment

The objective was to design a leaderboard that ranks challenge participants by the income they have earned, while making the experience interactive and appealing to college students.

Rather than presenting only a static ranking table, this implementation adds context around a participant's progress and gives the leaderboard a more motivating, game-like experience.

## ✨ Key Features

- **Interactive leaderboard** with participant rankings and earnings
- **Top 3 podium** to highlight leading participants
- **Time-based rankings** for all-time, monthly, and weekly earnings
- **Scope filtering** to explore the broader leaderboard or a college-focused view
- **Category filtering** for different earning categories
- **Participant search** by name, college, category, or starting point
- **My Journey** section showing the current participant's rank and progress
- **Earning Simulator** to simulate additional income and dynamically update rankings
- **Milestone Roadmap** to visualize earning milestones
- **Participant profiles** with additional information in an interactive modal
- **Celebratory feedback** with confetti when earnings are added or milestones are unlocked
- **Community income tracker** showing the collective earning impact

## 🛠 Tech Stack

- **React 19**
- **Vite**
- **JavaScript (ES Modules)**
- **CSS3**
- **Lucide React** for icons
- **Canvas Confetti** for interactive milestone feedback

## 🧩 Project Structure

```text
EYFI/
├── src/
│   ├── components/       # Reusable UI components
│   ├── data/             # Participant, profile and milestone data
│   ├── utils/             # Utility functions such as confetti effects
│   ├── App.jsx            # Main application and leaderboard state
│   ├── index.css          # Application styling
│   └── main.jsx           # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Run Locally

### Prerequisites

- Node.js installed
- npm installed

### Installation

```bash
git clone https://github.com/Komal25-ux/EYFI.git
cd EYFI
npm install
npm run dev
```

The development server will provide a local URL where the leaderboard can be viewed.

### Production Build

```bash
npm run build
npm run preview
```

## 💡 Design Approach

The leaderboard was designed around three ideas:

1. **Make ranking motivating** — the podium and movement indicators make competition visible without turning the page into a plain data table.
2. **Make progress personal** — the “My Journey” section gives participants a clear view of their own earnings and position.
3. **Make earning feel actionable** — the earning simulator and milestone roadmap turn the leaderboard from a passive ranking page into an interactive progress experience.

## 👤 Submission

**Komal Mittal**  
EYFI Challenge — Leaderboard Assignment
