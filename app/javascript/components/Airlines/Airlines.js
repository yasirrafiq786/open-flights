import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Airline from './Airline';

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/airlines')
      .then((response) => {
        setAirlines(response.data.data);
      })
      .catch((response) => console.log(response));
  }, [airlines.length]);

  const grid = airlines.map((airline) => {
    return (
      <Airline key={airline.attributes.name} attributes={airline.attributes} />
    );
  });

  return (
    <div className="home">
      <div className="header">
        <h1>OpenFlights</h1>
        <div className="subheader">Honest & Unbiased Reviews</div>
      </div>
      <div className="grid">
        <ul>{grid}</ul>
      </div>
    </div>
  );
};

export default Airlines;
