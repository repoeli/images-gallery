
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Handle the search submit event
    console.log("Search submitted", searchTerm);
  }
  // This function will be called when the form is submitted
  console.log("searchTerm", searchTerm);

  return (
    <div className="App">
     <Header title="Image Gallery"/>
     <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
