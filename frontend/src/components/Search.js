import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = ({ searchTerm, setSearchTerm, handleSubmit }) => {
  return (
    <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-lg shadow-sm"
        >
          <div className="relative flex-grow">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for new image..."
              className="w-full rounded-l-lg border border-gray-300 py-3 pl-12 pr-4 text-base text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-r-lg bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;