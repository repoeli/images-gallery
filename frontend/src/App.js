import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import ImageGallery from './components/ImageGallery';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    fetchImages(searchTerm.trim(), 1);
  };

  const fetchImages = (query, pageNum) => {
    if (!UNSPLASH_KEY) {
      setError('Missing Unsplash API key. Please check your .env file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=9&client_id=${UNSPLASH_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setImages(data.results);
        setTotalPages(Math.ceil(data.total / 9));
        setPage(pageNum);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch images. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    if (searchTerm) {
      fetchImages(searchTerm, newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        title="Image Gallery"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSearchSubmit}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : images.length > 0 ? (
          <ImageGallery 
            images={images}
            page={page}
            setPage={handlePageChange}
            totalPages={totalPages}
          />
        ) : searchTerm ? (
          <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.707 5.293a1 1 0 00-1.414 0L12 11.586 5.707 5.293a1 1 0 00-1.414 1.414L10.586 13l-6.293 6.293a1 1 0 101.414 1.414L12 14.414l6.293 6.293a1 1 0 001.414-1.414L13.414 13l6.293-6.293a1 1 0 000-1.414z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Start searching</h3>
            <p className="mt-1 text-sm text-gray-500">Enter a search term to find images</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
