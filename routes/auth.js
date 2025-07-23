const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const User=require('../models/User')
const Visit=require('../models/Visit')
const City=require('../models/City')

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const newUser = new User({ username, password })
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error('Error registering user:', error)
        res.status(500).json({ message: 'Error registering user' })
    }
})
module.exports = router
