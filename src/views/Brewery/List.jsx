import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from './../../components/Loading';

export default function BreweryList() {
  const [isLoading, setIsLoading] = useState(false);
  const [breweries, setBreweries] = useState([]);
  const [query, setQuery] = useState('');

  const initFetch = () => {
    setIsLoading(true);
    axios.get('https://api.openbrewerydb.org/breweries?per_page=10')
    .then(res => {
      setIsLoading(false);
      setBreweries(res.data);
    });
  }

  useEffect(() => {
    initFetch();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.get(`https://api.openbrewerydb.org/breweries/search?query=${query}`)
    .then(res => {
      setIsLoading(false);
      setBreweries(res.data);
    });
  }

  const reset = () => {
    setQuery('');
    initFetch();
  }

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='search' placeholder='Find a brewery' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type='submit' style={{marginLeft: '5px'}}>Search</button>
        <button type='reset' onClick={reset} style={{marginLeft: '5px'}}>Reset</button>
      </form>
      <ol>
        {
          breweries.map(e => 
            <li key={e.id}>
              <Link to={'/breweries/' + e.id}>{e.name}</Link> - {e.city}, {e.state}
            </li>
          )
        }
      </ol>
      { isLoading && <Loading />}
    </main>
  );
}
