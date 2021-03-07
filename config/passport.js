const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/redirect',
    },
    function (accessToken, refreshToken, profile, done) { 
        console.log(profile);
    })
);