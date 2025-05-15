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

  const fetchImages = async (query, pageNum) => {
    if (!UNSPLASH_KEY) {
      setError('Missing Unsplash API key. Please check your .env file.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=9&client_id=${UNSPLASH_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      setImages(data.results);
      setTotalPages(data.total_pages);
      setPage(pageNum);
    } catch (err) {
      setError('Error fetching images. Please try again.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header 
        title="Image Gallery"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSearchSubmit}
      />
      {error && <div className="alert alert-danger m-3">{error}</div>}
      {isLoading ? (
        <div className="d-flex justify-content-center m-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ImageGallery 
          images={images}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => fetchImages(searchTerm, newPage)}
        />
      )}
    </div>
  );
}

export default App;