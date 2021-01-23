const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const db = require('../Database/index.js');

const Locations = require('../Database/location.js');
const Restaurants = require('../Database/restaurant.js');
const Attractions = require('../Database/attraction.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

// LOCATION API
app.get('/api/location', (req, res) => {
  Locations.find(req, res);
});
app.post('/api/location', (req, res) => {
  Locations.create(req, res);
});
app.put('/api/location:id', (req, res) => {
  Locations.update(req, res);
});
app.delete('/api/location:id', (req, res) => {
  Locations.delete(req, res);
});

// RESTAURANT API
app.get('/api/restaurant', (req, res) => {
  Restaurants.find(req, res);
});
app.post('/api/restaurant', (req, res) => {
  Restaurants.create(req, res);
});
app.put('/api/restaurant:id', (req, res) => {
  Restaurants.update(req, res);
});
app.delete('/api/restaurant:id', (req, res) => {
  Restaurants.delete(req, res);
});

// ATTRACTION API
app.get('/api/attraction', (req, res) => {
  Attractions.find(req, res);
});
app.post('/api/attraction', (req, res) => {
  Attractions.create(req, res);
});
app.put('/api/attraction:id', (req, res) => {
  Attractions.update(req, res);
});
app.delete('/api/attraction:id', (req, res) => {
  Attractions.delete(req, res);
});

module.exports = app;
