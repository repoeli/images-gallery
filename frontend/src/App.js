import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted", searchTerm);

    fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Search results:", data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <div className="App">
     <Header title="Image Gallery"/>
     <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
