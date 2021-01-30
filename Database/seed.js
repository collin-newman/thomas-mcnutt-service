const Faker = require('faker');
const mongoose = require('mongoose');
const { Locations } = require('./location.js');
const { Restaurants } = require('./restaurant.js');
const { Attractions } = require('./attraction.js');
// eslint-disable-next-line no-unused-vars

const countries = [
  ['Martinique', 'France', 14.604, -61.074], ['Le Chesnay', 'France', 48.822, 2.122], ['Madrid', 'Spain', 40.416, -3.702], ['Hispania', 'Spain', 5.796, -75.904], ['Barcelona', 'Spain', 41.389, 2.159], ['Belmont', 'Spain', 10.668, -61.505], ['Vigo', 'Spain', 42.233, -8.722], ['Costa Bianca', 'Spain', 38.350, -0.467], ['London', 'England', 51.508, -0.125], ['Liverpool', 'England', 53.411, -2.978],
  ['Bristol', 'England', 51.455, -2.596], ['Derbyshire', 'England', 53.137, -1.610], ['Nottinghamshire', 'England', 53.128, -1.012], ['Leeds', 'England', 53.797, -1.547], ['Stockport', 'England', 53.410, -2.157], ['Oxford', 'England', 51.75286, -1.25592], ['Berlin', 'Germany', 52.524, 13.410], ['Hamburg', 'Germany', 53.550, 9.992], ['Franken', 'Germany', 50.000, 9.000], ['Munich', 'Germany', 48.138, 11.575]];

const sampleEvents = ['Camping', 'Swimming', 'Climbing', 'Observing', 'Group Crying', 'Exploring', 'Flavor Town', 'Elbow licking', 'Helicopter Rides', 'Orchestra Interrupting',
  'Taco Tuesday', 'Blindfolded Sprints', 'Uncomfortable Taxi Rides', 'Rat Worshiping', 'Onion Rubs', 'Rock Massages', 'Sharp Rock Massages', 'Homeless Man Rides', 'Drum Circles', 'Grave Digging'];
const randomizer = (num) => Math.floor(Math.random() * num);

const foodTypes = ['Chinese', 'Mexican', 'Greek', 'French', 'Thai', 'Spanish', 'Indian', 'English', 'German', 'American', 'Fast Food', 'Fine Dining', 'Greasy Platter'];

const sampleLocations = [];
const create100Locations = () => {
  for (let i = 0; i < 100; i += 1) {
    const rand = randomizer(countries.length);
    const reviewArray = [Faker.lorem.paragraph(), Faker.lorem.paragraph(), Faker.lorem.paragraph()];
    // Location data
    const name = countries[rand][0];
    sampleLocations.push({
      Name: name,
      coords: {
        lat: countries[rand][2],
        long: countries[rand][3],
      },
      ratings: {
        avg: randomizer(5),
        total: randomizer(1000),
      },
      address: {
        street: Faker.address.streetName(),
        city: name,
        country: countries[rand][1],
        zip: Faker.address.zipCode(),
      },
      reviews: reviewArray,
      website: `www.${name}.gov`,
      phoneNum: Faker.phone.phoneNumber(),
      email: `${name}@gmail.com`,
    });
  }
};

const sampleRestaurants = [];
const create100Restaurants = () => {
  for (let i = 0; i < 100; i += 1) {
    sampleRestaurants.push({
      name: Faker.company.companyName(),
      ratings: {
        avg: randomizer(5),
        total: randomizer(1000),
      },
      imageUrl: `${Faker.image.people()}?random=${randomizer(1000)}`,
      distanceFrom: `0.${randomizer(9)}`,
      foodType: foodTypes[randomizer(foodTypes.length)],
      price: randomizer(5),
    });
  }
};

const sampleAttractions = [];
const create100Attractions = () => {
  for (let i = 0; i < 100; i += 1) {
    sampleAttractions.push({
      name: Faker.company.companyName(),
      ratings: {
        avg: randomizer(5),
        total: randomizer(1000),
      },
      imageUrl: `${Faker.image.city()}?random=${randomizer(1000)}`,
      description: Faker.lorem.paragraph(),
      price: randomizer(200, 0),
      distanceFrom: `0.${randomizer(9)}`,
      basicDescription: sampleEvents[randomizer(sampleEvents.length)],
    });
  }
};

const insertSampleRestaurants = () => {
  Restaurants.find()
    .then((result) => {
      if (result.length < 100) {
        Restaurants.create(sampleRestaurants)
          .then(() => mongoose.disconnect());
        console.log('Restaurants seeded');
        console.log('Disconnected from Mongoose');
      } else {
        console.log('Restaurants already seeded');
      }
    });
};

const insertSampleLocations = () => {
  Locations.find()
    .then((result) => {
      if (result.length < 100) {
        Locations.create(sampleLocations)
          .then(() => insertSampleRestaurants());
        console.log('Locations seeded');
      } else {
        console.log('Locations already seeded');
      }
    });
};

const insertSampleAttractions = () => {
  Attractions.find()
    .then((result) => {
      if (result.length < 100) {
        Attractions.create(sampleAttractions)
          .then(() => insertSampleLocations());
        console.log('Attractions seeded');
      } else {
        console.log('Attractions already seeded');
      }
    });
};

const seedDB = () => {
  create100Locations();
  create100Attractions();
  create100Restaurants();
  insertSampleAttractions();
};

const mongoURI = 'mongodb://mongo:27017/maps';
mongoose.connect(mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
})
  .then((connection) => {
    connection.connection.db.dropDatabase();
  })
  .then(() => console.log('connected to mongoDB and dropped db'))
  .then(() => {
    seedDB();
  })
  .catch((err) => console.log('Error connecting to mongoDB', err));
