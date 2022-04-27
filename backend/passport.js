const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const GOOGLE_CLIENT_ID = "799062761054-cfo2je2qv671jm39havsrhmk98hahob9.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
    new GoogleStrategy(
    {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    },
function(accessToken, refreshToken,profile,done){
    // User.findOrCreate({googleId:profile.id}, function(err,user){
    //     return cb(err , user);
    // });
    done(null,profile)
}

));
passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})