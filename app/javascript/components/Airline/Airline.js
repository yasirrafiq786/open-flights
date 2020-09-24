import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Header';

const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({});

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;

    axios
      .get(url)
      .then((response) => setAirline(response.data))
      .catch((response) => console.log(response));
  }, []);

  return (
      <div className="wrapper">
          <div className="column">
              <Header />
              <div className="reviews"></div>
          </div>
          <div className="column">
              <div className="review-form">Review Form</div>
          </div>
      </div>
  )
};

export default Airline;
