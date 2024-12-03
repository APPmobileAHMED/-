// require('dotenv').config()
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const db=require("../sequelize/index.js")

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: "142946286343-qdkepot78adi9p4hv3mfrggf54tebhri.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "https://d376-41-62-25-148.ngrok-free.app/auth/google/callback"
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log('Access Token:', accessToken);
//       console.log('Profile:', profile);
//       try {
//         // التحقق من وجود المستخدم
//         let user = await db.users.findOne({ where: { email: profile.emails[0].value } });
        
//         if (!user) {
//           // إنشاء مستخدم جديد إذا لم يكن موجودًا
//           user = await db.users.create({
//             firstname:profile.displayName,
//             password:"123456",
//             role:"buyer",
//             lastname:profile.displayName,
//             username: profile.displayName,
//             email: profile.emails[0].value, // تأكد من أن `emails` تحتوي على الإيميل
//             photoDeprofile: profile.photos[0].value, // تأكد من وجود الصور
//           });
//         }
//         // إرجاع المستخدم
//         return done(null, user);
//       } catch (error) {
//         console.error('Error during Google authentication:', error);
//         return done(error, null);
//       }
//     }
//   )
// );

// // تخزين واسترجاع المستخدم في الجلسة
// passport.serializeUser((user, done) => {
//   done(null, user.id); // تخزين معرف المستخدم فقط
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await db.users.findByPk(id); // جلب المستخدم بالمعرف
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// module.exports = passport;