import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { authDependencies } from "../app/dependencies";

dotenv.config();

// 🔍 Kiểm tra và in ra SERVER_URL & callbackURL
const SERVER_URL = process.env.SERVER_URL;
if (!SERVER_URL) {
  console.warn("⚠️ WARNING: SERVER_URL is not set in environment variables!");
}

const callbackURL = `${SERVER_URL}/api/auth/oauth/google/callback`;
console.log("✅ Google OAuth callbackURL:", callbackURL);

// Cấu hình Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value || "";
        const full_name = profile.displayName;

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