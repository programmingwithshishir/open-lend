import passport from "passport";
import dotenv from "dotenv"
import {Strategy} from "passport-google-oauth20"

dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        // In a real application, you'd save or lookup the user in your database here.
        console.log("User authenticated:", profile);
        return done(null, profile);
    }
));

export default passport;