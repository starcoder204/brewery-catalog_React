import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from './../../components/Loading';

export default function BreweryDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [brewery, setBrewery] = useState(null);
  const [errMsg, setErrMsg] = useState('waiting...')
  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://api.openbrewerydb.org/breweries/${id}`)
    .then(res => {
      setIsLoading(false);
      setBrewery(res.data);
    })
    .catch(err => {
      setIsLoading(false);
      setErrMsg(err.response.data.message);
    });
  }, [id])

  return (
    <main>
      {
        brewery ? <div>
          <h1>Id: {id}</h1>
          <p>{brewery.name}</p>
          <p>{brewery.city}, {brewery.state}</p>
          <p>{brewery.country}</p>
          <p>{brewery.phone}</p>
          {(brewery.website_url) && (
            <p>
            <a href={brewery.website_url} target="blank">View Website</a>
            </p>
          )}
        </div> : <h6> {errMsg} </h6>
      }      
      <Link to='/breweries' style={{display: 'block', marginTop: '10px'}}>Back to Breweries</Link>
      { isLoading && <Loading />}
    </main>
  );
}
