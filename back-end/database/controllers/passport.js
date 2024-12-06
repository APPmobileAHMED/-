require('dotenv').config()
const passport = require('passport');
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db=require("../sequelize/index.js")

passport.use(
  new GoogleStrategy(
    {
      clientID: "615409385557-6mjbejkgvmf965pvbcoipbnc3ng8ghpo.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://c114-160-156-40-44.ngrok-free.app/auth/google/callback",
      passReqToCallback: true,
    },
    async (req,accessToken, refreshToken, profile, done) => {
      console.log(profile,"kpfkzefklezezf")
      try {
        const state = JSON.parse(req.query.state || '{}');
        const role = state.role || "buyer"; 
        // التحقق من وجود المستخدم
        let user = await db.users.findOne({ where: { id: profile.id } });
        
        if (!user) {
          const hashedPassword = await bcrypt.hash("123456", 10); 
          user = await db.users.create({
            firstname: profile.name.givenName,
            password: hashedPassword,
            role: role,
            lastname: profile.name.familyName,
            username: profile.displayName,
            email: profile.emails[0].value,
            photoDeprofile: profile.photos[0].value,
          });
        }

       
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.SECRET
       
        );

        
        return done(null, { user, token });
      } catch (error) {
        console.error('Error during Google authentication:', error);
        return done(error, null);
      }
    }
  )
);

// تخزين واسترجاع المستخدم في الجلسة
passport.serializeUser((user, done) => {
  console.log("Serializing userrrrrrrrrrr:", user.user.id);
  done(null, user.user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.users.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;