require('dotenv').config()
const passport = require('passport');
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db=require("../sequelize/index.js")

passport.use(
  new GoogleStrategy(
    {
      clientID: "615409385557-ileopjc6peho9snf14hpbcipq3l21els.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://66b9-196-233-246-102.ngrok-free.app/auth/google/callback",
      passReqToCallback: true,
    },
    async (req,accessToken, refreshToken, profile, done) => {
      try {
        const state = JSON.parse(req.query.state || '{}');
        const role = state.role || "buyer"; 
        // التحقق من وجود المستخدم
        let user = await db.users.findOne({ where: { id: profile.id } });
        
        if (!user) {
         
          // إنشاء مستخدم جديد إذا لم يكن موجودًا
          user = await db.users.create({
            firstname:profile.displayName,
            password:"123456",
            role:role,
            lastname:profile.displayName,
            username: profile.displayName,
            email: profile.emails[0].value, // تأكد من أن `emails` تحتوي على الإيميل
            photoDeprofile: profile.photos[0].value, // تأكد من وجود الصور
          });
        }
        // إرجاع المستخدم
        return done(null, user);
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null);
      }
    }
  )
);

// تخزين واسترجاع المستخدم في الجلسة
passport.serializeUser((user, done) => {
  done(null, user.id); // تخزين معرف المستخدم فقط
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findByPk(id); // جلب المستخدم بالمعرف
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;