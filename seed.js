const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const City = require('./models/City');
const cities = require('./cities.json');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    return City.deleteMany({});
  })
  .then(() => {
    return City.insertMany(cities);
  })
  .then(() => {
    console.log('Cities inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting cities:', err);
  });
