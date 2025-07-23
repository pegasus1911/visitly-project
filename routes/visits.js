const express=require('express')
const Visit=require('../models/Visit')
const City=require('../models/City')
const router=express.Router()

router.post('/visits', async(req,res)=>{
    try{
        const {description, rating, visitType, city, dateIn, dateOut} = req.body
        const newVisit= new Visit({
            description,rating, visitType,city, dateIn, dateOut
        })
        await newVisit.save()
        res.redirect('/cities/'+city)
    }
    catch(err){
        console.error('there is an eror while saving ur visit'+err)
        res.status(500).send('there is an errowr while saving ur visit')
    }
})
router.delete('/visits/:id', async(req,res)=>{
    const visitId=req.params.id
    const visit=await Visit.findByIdAndDelete(visitId)
    res.redirect('/cities/'+visit.city)
})
module.exports = router;
