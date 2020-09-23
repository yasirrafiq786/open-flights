import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

  const list = airlines.map((airline) => {
    return <li key={airline.attributes.name}>{airline.attributes.name}</li>;
  });

  return (
    <div className="home">
      <div className="header">
        <h1>OpenFlights</h1>
        <div className="subheader">Honest & Unbiased Reviews</div>
      </div>
      <div className="grid">
        <ul>{list}</ul>
      </div>
    </div>
  );
};

export default Airlines;
