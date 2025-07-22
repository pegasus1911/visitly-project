const express = require('express')

const router = express.Router()
const City = require('../models/City')
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
    res.json(city)
})

module.exports = router

