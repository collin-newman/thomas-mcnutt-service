import React from 'react';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid';
import {
  StyledDoc, StyledRoot, StyledWhatTravellers, RatingBubbles, ReviewStayRight,
} from '../componentStyles';
import Reviews from './Reviews';
import Map from './Map';
import NearbyInfo from './NearbyInfo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      restaurants: null,
      attractions: null,
      mainAttraction: null,
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.getLocation();
    this.getRestaurants();
    this.getAttractions();
  }

  getLocation() {
    Axios.get('http://18.212.23.167:3003/api/location')
    // Axios.get('/api/restaurant')
      .then((result) => {
        const { data } = result;
        this.setState({
          location: data,
        });
      })
      .catch((err) => { console.log(err); });
  }

  getRestaurants() {
    Axios.get('http://18.212.23.167:3003/api/restaurant')
    // Axios.get('/api/restaurant')
      .then((result) => {
        const { data } = result;
        this.setState({
          restaurants: data,
        });
      })
      .catch((err) => { console.log(err); });
  }

  getAttractions() {
    Axios.get('http://18.212.23.167:3003/api/attraction')
    // Axios.get('/api/attraction')
      .then((result) => {
        this.setState({
          attractions: result.data,
        });
      })
      .then(() => {
        const { attractions } = this.state;
        this.setState({
          mainAttraction: attractions[3],
        });
      })
      .catch((err) => { console.log(err); });
  }

  render() {
    const {
      location, restaurants, mainAttraction, attractions,
    } = this.state;
    return (
      <StyledRoot>
        <StyledDoc>
          { location
            && (
              <div>
                <div>
                  <Grid container spacing={0}>
                    <StyledWhatTravellers item xs={3}>
                      What travelers are saying about
                      {' '}
                      {location.Name}
                    </StyledWhatTravellers>
                    <RatingBubbles item xs={1}>
                      <h1 style={{ float: 'right', top: '-50' }}>
                        {location.ratings.avg}
                      </h1>
                    </RatingBubbles>
                    <RatingBubbles item xs={1}>
                      <Rating
                        style={{ color: 'rgb(52, 224, 161' }}
                        name="customized-icons"
                        value={location.ratings.avg}
                        precision={0.5}
                        size="small"
                        icon={<FiberManualRecordIcon />}
                        getLabelText={() => `${location.ratings.total} reviews`}
                      />
                    </RatingBubbles>
                    <ReviewStayRight item xs={7}>
                      <h5 style={{ float: 'right' }}>
                        {`Read all ${location.ratings.total} reviews`}
                      </h5>
                    </ReviewStayRight>
                  </Grid>
                  <Reviews
                    reviews={location.reviews}
                    // ratings={location.ratings}
                  />
                </div>
                <div className="map">
                  <Map
                    coords={location.coords}
                  />
                </div>
              </div>
            ) }
          {location && restaurants && mainAttraction && attractions && (
          <div className="information-panel">
            <NearbyInfo
              location={location}
              restaurants={restaurants}
              mainAttraction={mainAttraction}
              attractions={attractions}
            />
          </div>
          ) }
        </StyledDoc>
      </StyledRoot>
    );
  }
}

export default App;
