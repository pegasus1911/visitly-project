const express = require('express'); 
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('oops, sorry there is an eroorr in registereing u');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.send('user not found');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send('wrong password');
    }

    req.session.userId = user._id;
    res.redirect('/cities/search-page');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Error logging in'+err);
  }
});
router.post('/logout',(req,res)=>{
  console.log('salman')
      req.session.destroy(() => {
        res.redirect('/login')
    })
})
module.exports = router;
