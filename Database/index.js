const mongoose = require('mongoose');

const mongoURI = 'mongodb://mongo:27017/maps';

module.exports = {
  db: () => {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
    })
      .then(() => console.log('connected to mongoDB'))
      .catch((err) => console.log('Error connecting to mongoDB', err));
  },

  dbDisc: (done) => {
    mongoose.disconnect(done)
      .catch((err) => console.log('error disconnecting from mongoDB', err));
  },
};
