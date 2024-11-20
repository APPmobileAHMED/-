require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db=require("../sequelize/index.js")

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.ID_CLIENT,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://ab71-2c0f-4280-10-60fa-6531-7296-7a49-d87b.ngrok-free.app/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // التحقق من وجود المستخدم
        let user = await db.users.findOne({ where: { id: profile.id } });
        
        if (!user) {
          // إنشاء مستخدم جديد إذا لم يكن موجودًا
          user = await db.users.create({
            firstname:profile.displayName,
            password:"123456",
            role:"buyer",
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