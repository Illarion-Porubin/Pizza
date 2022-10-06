require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "798933596550-8v7cqlggnmv9k35b9is349bcr58qulvs.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});