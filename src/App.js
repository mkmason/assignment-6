import React, { useEffect, useState } from 'react';
import Person from './Person';
import key from './key';


const DEFAULT_QUERY = "Gosling";
let QUERYTEXT = DEFAULT_QUERY;

const App = () => {
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const QUERY = searchQuery || DEFAULT_QUERY;

    useEffect(() => {
        fetchData();
    }, []);

    const navigateTo = (index) => {
      if (index>=0 && index<results.length){
        setSelectedIndex(index);
      }
    };
    const searchPressed = async () => {
      console.log("Search pressed");
      QUERYTEXT = searchQuery;
      if (QUERYTEXT === "") {
        QUERYTEXT = DEFAULT_QUERY;
      }
      fetchData();
      setSelectedIndex(0);
    };
    const fetchData = async () => {
      try {
          const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${QUERY}&api_key=${key}`);
          const data = await response.json();
          setResults(data.results);
          console.log(data.results);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
    return (
        <div>
          <h1>Search for an Actor</h1>
          <input 
        type="text" 
        value={searchQuery} 
        placeholder="Search..." 
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { searchPressed(); } }}
      />
          <button onClick={searchPressed}>Search</button>
            <h1>Search Results for "{QUERYTEXT}"</h1>
            {results.length > 0 && (
              <div>
                <Person person={results[selectedIndex]} />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                {selectedIndex !== 0 && <button onClick={() => navigateTo(0)}>1</button>}
                {selectedIndex > 3 && <span>···</span>}

                {selectedIndex - 2 >= 1 && <button onClick={() => navigateTo(selectedIndex - 2)}>{selectedIndex - 1}</button>}
                {selectedIndex - 1 >= 1 && <button onClick={() => navigateTo(selectedIndex - 1)}>{selectedIndex}</button>}

                <button className="active-button">{selectedIndex + 1}</button>

                {selectedIndex + 1 < results.length -1 && <button onClick={() => navigateTo(selectedIndex + 1)}>{selectedIndex + 2}</button>}
                {selectedIndex + 2 < results.length -1 && <button onClick={() => navigateTo(selectedIndex + 2)}>{selectedIndex + 3}</button>}
                
                {selectedIndex < results.length - 4 && <span>···</span>}
                {selectedIndex !== results.length - 1 && <button onClick={() => navigateTo(results.length - 1)}>{results.length}</button>}
                </div>
              </div>
            )}
        </div>
    );
};

export default App;