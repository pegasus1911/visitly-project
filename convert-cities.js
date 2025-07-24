const fs = require('fs');


const data = require('./all-countries-and-cities-json/countriesToCities.json'); 

const cities = [];

for (const country in data) {
  data[country].forEach(city => {
    cities.push({ name: city, country });
  });
}

fs.writeFileSync('cities.json', JSON.stringify(cities, null, 2));
console.log(' cities.json created successfully!');
