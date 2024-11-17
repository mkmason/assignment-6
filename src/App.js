import React, { useEffect, useState } from 'react';
import Person from './Person';


const QUERY = "Gosling";
const KEY = "0263244cabbc1d330a16d2f2c343388b"

const App = () => {
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${QUERY}&api_key=${KEY}`);
                const data = await response.json();
                setResults(data.results);
                console.log(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const navigateTo = (index) => {
      if (index>=0 && index<results.length){
        setSelectedIndex(index);
      }
    };

    return (
        <div>
            <h1>Search Results for "{QUERY}"</h1>
            {results.length > 0 && (
              <div>
                <Person person={results[selectedIndex]} />
                <div>
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
