import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '../assets/icons/SearchOutline.svg?react';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="어떤 식재료를 찾고 계시나요?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        {searchText && (
          <button 
            className="clear-button"
            onClick={() => setSearchText('')}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
