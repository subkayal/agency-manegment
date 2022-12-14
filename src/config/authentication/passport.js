const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../../models/user.model');


  const accessTokenAuthOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jWT_SECRETS,
    passReqToCallback: true,
  };
    
  passport.use('jwt', new JwtStrategy(accessTokenAuthOptions, (req, payload, done) => {
    User.findById(payload.id, (err, user) => {
      if (err) {
        done({ success: false, message: err.message }, false);
      }
      if (!user) done({ success: false, message: "Unauthorized user"}, false);
      req.user = user;
      done(null, user);
    });
  }));