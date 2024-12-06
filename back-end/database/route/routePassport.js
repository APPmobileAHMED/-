const express = require('express');
const passport = require('../controllers/passport.js');
const router = express.Router();

router.get('/auth/google', (req, res, next) => {
  const { role } = req.query; // ناخذ الدور اللي بعثه المستخدم
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: JSON.stringify({ role }) // نمرر الدور للـ callback عبر state
  })(req, res, next);
});

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    const role = req.query.state ? JSON.parse(req.query.state).role : 'buyer'; // الدور الافتراضي
    const token = req.user.token; // التوكن الذي تم توليده في Passport.js

    // توجيه المستخدم إلى التطبيق مع التوكن والدور
    res.redirect(`exp://192.168.139.160:8081?role=${role}&token=${token}`); 
  }
);

module.exports = router;
