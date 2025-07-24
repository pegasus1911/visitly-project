const express = require('express');
const router = express.Router();
const City = require('../models/City');
const Visit = require('../models/Visit');
const User = require('../models/User');
const requireLogin = require('../middelware/auth');

router.get('/', (req, res) => {
  res.send('cities route is working');
});
router.get('/search-page', requireLogin, async (req, res) => {
  try {
    res.render('search-page', { session: req.session });
  } catch (err) {
    console.error('Error loading city page:', err);
    res.send('Error loading city page');
  }
});


router.get('/search', requireLogin, async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  const cities = await City.find({
    name: { $regex: query, $options: 'i' }
  }).limit(10);

  res.json(cities);
});


router.get('/:id', requireLogin, async (req, res) => {
  try {
    const cityId = req.params.id;
    const city = await City.findById(cityId);
    const visits = await Visit.find({ city: cityId })
      .populate('user')
      .populate('city');

        res.render('city-details', { city, visits, session: req.session })
  } catch (err) {
    console.error('Error fetching city details:', err);
    res.status(500).send('Error loading city page');
  }
});

router.get('/:id/add-visit', requireLogin, async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    res.render('add-visit', { city });
  } catch (err) {
    console.error('Error loading add-visit page:', err);
    res.status(500).send('Error loading add-visit form');
  }
});
router.get('/search-page', requireLogin, (req, res) => {
  res.render('search');
});


module.exports = router;
