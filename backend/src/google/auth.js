import passport from "passport";
import prisma from "../lib/prisma.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await prisma.User.upsert({
          where: { email: profile.emails[0].value },
          update: {},
          create: {
            email: profile.emails[0].value,
            name: profile.displayName,
            accessToken: accessToken,
            username: profile.emails[0].value,
          },
        });
        cb(null, user);
      } catch (error) {
        cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.User.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
