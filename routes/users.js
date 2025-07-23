const express = require('express'); 
const User = require('../models/User');
const router = express.Router();
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req,res)=>{
    const {username,password}=req.body;
    try{
        const newUser= new User({username,password})
        await newUser.save()
        res.send('user  is rgistred sucessfully')
    }
    catch(err){
        console.error('there is a err while registining user '+err)
        res.status(500).send('there is an errorr while registering the usr')
    }
})
module.exports = router;
