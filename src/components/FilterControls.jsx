import React from 'react';
import { Globe, Building2, Calendar, Filter } from 'lucide-react';
import { HUSTLE_CATEGORIES } from '../data/participants';

export default function FilterControls({
  scope,
  onScopeChange,
  timeFilter,
  onTimeFilterChange,
  selectedCategory,
  onCategoryChange,
  userCollege
}) {
  return (
    <div className="controls-container">
      <div className="controls-top-row">
        {/* Scope Toggle: All India vs My College */}
        <div className="scope-toggle-group">
          <button
            className={`scope-btn ${scope === 'all_india' ? 'active' : ''}`}
            onClick={() => onScopeChange('all_india')}
          >
            <Globe size={15} />
            <span>ALL INDIA</span>
          </button>

          <button
            className={`scope-btn ${scope === 'my_college' ? 'active' : ''}`}
            onClick={() => onScopeChange('my_college')}
          >
            <Building2 size={15} />
            <span>MY COLLEGE ({userCollege.split(' ')[0]})</span>
          </button>
        </div>

        {/* Time Filters: This Week / This Month / All Time */}
        <div className="time-filter-group">
          <button
            className={`time-btn ${timeFilter === 'this_week' ? 'active' : ''}`}
            onClick={() => onTimeFilterChange('this_week')}
          >
            THIS WEEK
          </button>

          <button
            className={`time-btn ${timeFilter === 'this_month' ? 'active' : ''}`}
            onClick={() => onTimeFilterChange('this_month')}
          >
            THIS MONTH
          </button>

          <button
            className={`time-btn ${timeFilter === 'all_time' ? 'active' : ''}`}
            onClick={() => onTimeFilterChange('all_time')}
          >
            ALL TIME
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-scroll-container">
        {HUSTLE_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
