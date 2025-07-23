const express = require('express')
const Visit = require('../models/Visit')
const City = require('../models/City')
const User = require('../models/User')
const requireLogin = require('../middelware/auth')
const router = express.Router()
router.post('/visits', requireLogin, async (req, res) => {
    try {
        req.body.user = req.session.userId;
        const newVisit = new Visit(req.body)
        await newVisit.save()
        res.redirect('/cities/' + newVisit.city);
    }
    catch (err) {
        console.error('there is an eror while saving ur visit' + err)
        res.status(500).send('there is an errowr while saving ur visit')
    }
})
router.delete('/visits/:id', requireLogin, async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).send('Visit not found');
        }

        if (!visit.user.equals(req.session.userId)) {
            return res.status(403).send('You are not allowed to delete this visit');
        }
        await visit.deleteOne();
        res.redirect('/cities/' + visit.city);
    } catch (err) {
        console.error('Error deleting visit:' + err);
        res.status(500).send('Internal server error');
    }
});
router.get('/visits/:id/edit', requireLogin, async (req, res) => {
  const visit = await Visit.findById(req.params.id).populate('city');

  if (!visit) return res.status(404).send('Visit not found');
  if (!visit.user.equals(req.session.userId)) {
    return res.status(403).send('Not allowed to edit this visit');
  }

  res.render('edit-visit', { visit });
});
router.put('/visits/:id', requireLogin, async (req, res) => {
  const visit = await Visit.findById(req.params.id);
  if (!visit) return res.status(404).send('Visit not found');
  if (!visit.user.equals(req.session.userId)) {
    return res.status(403).send('Not allowed to edit this visit');
  }
  const { description, rating, visitType, dateIn, dateOut } = req.body;
  visit.description = description;
  visit.rating = rating;
  visit.visitType = visitType;
  visit.dateIn = dateIn;
  visit.dateOut = dateOut;
  await visit.save();
  res.redirect('/cities/' + visit.city);
});
module.exports = router;
