const express = require('express');
const passport = require('../controllers/passport.js');
const router = express.Router();

router.get('/auth/google', (req, res, next) => {
  const { role } = req.query; 
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: JSON.stringify({ role }) 
  })(req, res, next);
});

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    const role = req.query.state ? JSON.parse(req.query.state).role : 'buyer'; 
    const token = req.user.token; 

    
    res.redirect(`exp://192.168.196.160:8081?role=${role}&token=${token}`); 
  }
);

module.exports = router;
