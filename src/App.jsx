import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import LeaderboardHero from './components/LeaderboardHero';
import CommunityStats from './components/CommunityStats';
import TopPodium from './components/TopPodium';
import FilterControls from './components/FilterControls';
import SearchBar from './components/SearchBar';
import LeaderboardList from './components/LeaderboardList';
import MyJourney from './components/MyJourney';
import MilestoneRoadmap from './components/MilestoneRoadmap';
import EarningSimulatorModal from './components/EarningSimulatorModal';
import ParticipantModal from './components/ParticipantModal';

import { USER_PROFILES, DEFAULT_USER_ID } from './data/userProfiles';
import { INITIAL_PARTICIPANTS } from './data/participants';
import { MILESTONES } from './data/milestones';
import { triggerConfetti, triggerMilestoneUnlockConfetti } from './utils/confetti';

export default function App() {
  // 1. Current Profile State
  const [currentProfileId, setCurrentProfileId] = useState(DEFAULT_USER_ID);
  const currentProfile = useMemo(() => {
    return USER_PROFILES.find((p) => p.id === currentProfileId) || USER_PROFILES[0];
  }, [currentProfileId]);

  // Income overrides per user profile
  const [userIncomes, setUserIncomes] = useState({
    komal_mittal: 8750,
    aarav_gupta: 0,
    ananya_sharma: 48500,
    priya_nair: 24200
  });

  const currentUserIncome = userIncomes[currentProfileId] ?? currentProfile.initialIncome;

  // 2. Filter & Scope States
  const [scope, setScope] = useState('all_india'); // 'all_india' | 'my_college'
  const [timeFilter, setTimeFilter] = useState('all_time'); // 'all_time' | 'this_month' | 'this_week'
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Modals & Popups
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [selectedModalParticipant, setSelectedModalParticipant] = useState(null);

  // 4. Community Total
  const [communityTotal, setCommunityTotal] = useState(842650);

  // 5. Build Dynamic Participant List
  const allProcessedParticipants = useMemo(() => {
    // Clone list
    const list = [...INITIAL_PARTICIPANTS];

    // Find if current profile is already in list or needs update
    const userIndex = list.findIndex((p) => p.id === currentProfile.id || (p.isCurrentUser && currentProfile.id === 'komal_mittal'));

    const currentUserObj = {
      id: currentProfile.id,
      name: currentProfile.name,
      college: currentProfile.college,
      city: currentProfile.city,
      avatar: currentProfile.avatar,
      incomeAllTime: currentUserIncome,
      incomeThisMonth: Math.min(currentUserIncome, Math.round(currentUserIncome * 0.75)),
      incomeThisWeek: Math.min(currentUserIncome, Math.round(currentUserIncome * 0.4)),
      movementAllTime: currentProfile.id === 'aarav_gupta' && currentUserIncome === 0 ? '—' : 4,
      movementThisMonth: 3,
      movementThisWeek: 6,
      category: currentProfile.category,
      startedWith: currentProfile.startedWith,
      streak: currentUserIncome > 0 ? (currentProfile.streak || 4) : 0,
      recentMilestone: currentProfile.recentMilestone,
      bio: currentProfile.bio,
      isCurrentUser: true
    };

    if (userIndex !== -1) {
      list[userIndex] = currentUserObj;
    } else {
      list.push(currentUserObj);
    }

    // Sort by selected timeFilter income descending
    return list.sort((a, b) => {
      let incomeA = timeFilter === 'this_week' ? a.incomeThisWeek : timeFilter === 'this_month' ? a.incomeThisMonth : a.incomeAllTime;
      let incomeB = timeFilter === 'this_week' ? b.incomeThisWeek : timeFilter === 'this_month' ? b.incomeThisMonth : b.incomeAllTime;
      return incomeB - incomeA;
    });
  }, [currentProfile, currentUserIncome, timeFilter]);

  // 6. Filtered List based on Scope, Category, and Search
  const filteredParticipants = useMemo(() => {
    return allProcessedParticipants.filter((p) => {
      // Scope Filter: My State (Delhi)
      if (scope === 'my_college') {
        const pCollege = (p.college || '').toLowerCase();
        const pCity = (p.city || '').toLowerCase();
        const isDelhi = pCity.includes('delhi') || pCollege.includes('delhi') || pCollege.includes('dtu') || pCollege.includes('nsut') || pCollege.includes('srcc');
        if (!isDelhi) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'All Categories') {
        if (!p.category?.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesCollege = p.college?.toLowerCase().includes(q);
        const matchesCategory = p.category?.toLowerCase().includes(q);
        const matchesStarted = p.startedWith?.toLowerCase().includes(q);
        return matchesName || matchesCollege || matchesCategory || matchesStarted;
      }

      return true;
    });
  }, [allProcessedParticipants, scope, selectedCategory, searchQuery, currentProfile]);

  // Top 3 Podium Participants (from active filtered or overall scope)
  const topThree = useMemo(() => {
    return filteredParticipants.slice(0, 3);
  }, [filteredParticipants]);

  // Current User's Dynamic Rank in active list
  const userRankInView = useMemo(() => {
    const idx = filteredParticipants.findIndex((p) => p.id === currentProfile.id || p.isCurrentUser);
    return idx !== -1 ? idx + 1 : null;
  }, [filteredParticipants, currentProfile]);

  // 7. Handler: Add Simulated Earning
  const handleAddEarning = (amount, note) => {
    const oldIncome = currentUserIncome;
    const newIncome = oldIncome + amount;

    setUserIncomes((prev) => ({
      ...prev,
      [currentProfileId]: newIncome
    }));

    setCommunityTotal((prev) => prev + amount);

    // Check if new milestone unlocked
    const passedMilestone = MILESTONES.find(
      (m) => oldIncome < m.amount && newIncome >= m.amount
    );

    if (passedMilestone) {
      triggerMilestoneUnlockConfetti();
      setTimeout(() => {
        alert(`🎉 CONGRATULATIONS! You just unlocked the "${passedMilestone.badge}" milestone!`);
      }, 300);
    } else {
      triggerConfetti();
    }
  };

  return (
    <div className="app-root">
      {/* 1. Header */}
      <Header
        currentProfile={currentProfile}
        onSelectProfile={(id) => setCurrentProfileId(id)}
        challengeDay={18}
        totalDays={30}
      />

      <main className="app-container">
        {/* 2. Hero */}
        <LeaderboardHero />

        {/* 3. Community Impact Banner */}
        <CommunityStats totalCommunityIncome={communityTotal} />

        {/* 4. Top 3 Podium (Only when search is not active or when at least 3 match) */}
        {!searchQuery && topThree.length >= 3 && (
          <TopPodium
            topParticipants={topThree}
            onSelectParticipant={(p) => setSelectedModalParticipant(p)}
            timeFilter={timeFilter}
          />
        )}

        {/* 5. Main 2-Column Layout */}
        <div className="main-layout-grid">
          {/* Left Column: Controls, Search, and Leaderboard Table */}
          <section className="leaderboard-main-col">
            <FilterControls
              scope={scope}
              onScopeChange={setScope}
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              userCollege={currentProfile.college}
            />

            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultsCount={filteredParticipants.length}
            />

            <LeaderboardList
              participants={filteredParticipants}
              currentUserId={currentProfile.id}
              timeFilter={timeFilter}
              onSelectParticipant={(p) => setSelectedModalParticipant(p)}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          </section>

          {/* Right Column: "My Journey" (The Key Differentiator) */}
          <MyJourney
            currentUser={currentProfile}
            currentIncome={currentUserIncome}
            userRank={userRankInView}
            scope={scope}
            allParticipants={filteredParticipants}
            timeFilter={timeFilter}
            onOpenSimulator={() => setIsSimulatorOpen(true)}
            onOpenRoadmap={() => setIsRoadmapOpen(true)}
          />
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            <strong>EYFI Challenge</strong> • EARN. CLIMB. PROVE IT. • Day 18 of 30
          </p>
          <p style={{ marginTop: '4px', fontSize: '0.78rem' }}>
            Built for India's Student Earning Movement
          </p>
        </footer>
      </main>

      {/* Modals */}
      <EarningSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onAddEarning={handleAddEarning}
        currentIncome={currentUserIncome}
      />

      <MilestoneRoadmap
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        currentIncome={currentUserIncome}
      />

      <ParticipantModal
        participant={selectedModalParticipant}
        isOpen={!!selectedModalParticipant}
        onClose={() => setSelectedModalParticipant(null)}
        timeFilter={timeFilter}
      />
    </div>
  );
}
