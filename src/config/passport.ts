import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { authDependencies } from "../app/dependencies";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/api/auth/oauth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value || "";
        const full_name = profile.displayName;

        // Gọi usecase của bạn
        const user = await authDependencies.loginWithGoogle.execute(
          googleId,
          email,
          full_name
        );

        return done(null, user);
      } catch (err) {
        console.error("Google login error:", err);
        return done(err, undefined);

      }
    }
  )
);

export default passport;
