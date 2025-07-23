const express = require('express')

const router = express.Router()
const City = require('../models/City')
const Visit=require('../models/Visit')
const User=require('../models/User')

router.get('/', (req, res) => {
    res.send('cities rout is working')
})
router.get('/search', async(req, res) => {
    const query = req.query.q
    if (!query) {
        return []
    }
    const cities = await City.find({
        name: new RegExp(query, 'i'),
    }).limit(10)
    res.json(cities)
})
router.get('/:id',async(req,res)=>{
    const cityId=req.params.id
    const city= await City.findById(cityId)
    const visits=await Visit.find({ city : cityId})
    // res.json({city,visits})
    res.render('city-details', { city, visits })



})

router.get('/:id/add-visit', async (req,res)=>{
    const city=await City.findById(req.params.id)
    res.render('add-visit',{city})
})
module.exports = router

