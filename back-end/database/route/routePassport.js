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
    // استرجاع الدور من الـ state
    const role = req.query.state ? JSON.parse(req.query.state).role : 'buyer'; // استخدام 'buyer' كدور افتراضي

    // يمكنك تخزين هذا الدور في الـ session أو إرساله مع الـ token إذا كنت تحتاجه.
    // هنا كود إعادة التوجيه مع الـ role:
    res.redirect(`exp://192.168.43.160:8081?role=${role}`); // توجيه المستخدم إلى التطبيق مع الدور
  }
);

module.exports = router;
