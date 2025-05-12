import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageGallery from './components/ImageGallery';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchImages(searchTerm, 1);
  };

  const fetchImages = (query, pageNum) => {
    fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${pageNum}&per_page=9&client_id=${UNSPLASH_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setImages(data.results);
        setTotalPages(Math.ceil(data.total / 9));
        setPage(pageNum);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  // Effect to refetch images when page changes
  const handlePageChange = (newPage) => {
    if (searchTerm) {
      fetchImages(searchTerm, newPage);
    }
  };

  return (
    <div className="App">
      <Header title="Image Gallery"/>
      <Search 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        handleSubmit={handleSearchSubmit}
      />
      {images.length > 0 && (
        <ImageGallery 
          images={images}
          page={page}
          setPage={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default App;
