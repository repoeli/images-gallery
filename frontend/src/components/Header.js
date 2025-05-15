import React from 'react';

const Header = ({ title, searchTerm, setSearchTerm, handleSubmit }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <a className="navbar-brand" href="/">
          {title}
        </a>

        <form className="d-flex ms-auto" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light"
              placeholder="Search images..."
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
    </nav>
  );
};

export default Header;