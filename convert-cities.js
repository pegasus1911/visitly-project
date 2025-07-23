const fs = require('fs');

// Load the original country-to-cities JSON
const data = require('./all-countries-and-cities-json/countriesToCities.json'); // make sure this path is correct

const cities = [];

for (const country in data) {
  data[country].forEach(city => {
    cities.push({ name: city, country });
  });
}

// Save new cities array to cities.json
fs.writeFileSync('cities.json', JSON.stringify(cities, null, 2));
console.log('✅ cities.json created successfully!');
