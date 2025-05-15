import React from 'react';

const Search = ({ searchTerm, setSearchTerm, handleSubmit }) => {
  return (
    <div className="container py-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '0.5rem' }}
          />
          <button 
            className="btn btn-link text-secondary position-absolute end-0" 
            type="submit"
            style={{ zIndex: 4 }}
          >
            <svg 
              width="16" 
              height="16" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;