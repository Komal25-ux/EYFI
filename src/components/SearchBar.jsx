import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange, resultsCount }) {
  return (
    <div className="search-wrapper">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search hustlers by name, college, or skill (e.g. Ananya, IIT, Figma)..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          className="search-clear-btn"
          onClick={() => onSearchChange('')}
          title="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
