import React, {useState, useEffect} from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import Header from './Header';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;
  &:last-child {
    background: #000;
  }
`;
const Main = styled.div`
  padding-left: 50px;
`;

const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;

    axios
      .get(url)
      .then((response) => {
        setAirline(response.data);
        setLoaded(true);
      })
      .catch((response) => console.log(response));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const airline_id = airline.data.id;
    axios
      .post('/api/v1/reviews', {review, airline_id})
      .then((response) => {
          const included = [...airline.included, response.data.data]
          setAirline(...airline, included)
          setReview({title:'', description:'', score:0})
        })
      .catch((response) => console.log(response));
  };

  return (
    <Wrapper>
      {loaded && (
        <React.Fragment>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={airline.included}
              />

              <div className="reviews"></div>
            </Main>
          </Column>
          <Column>
            <div className="review-form">
              <ReviewForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                attributes={airline.data.attributes}
                review={review}
              />
            </div>
          </Column>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default Airline;
