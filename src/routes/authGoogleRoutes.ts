// src/routes/authGoogleRoutes.ts
import express from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";
import { CLIENT_ROUTES } from "../config/api";

const router = express.Router();

// 🔹 1️⃣ Bắt đầu login Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 2️⃣ Callback từ Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      // ✅ Redirect về frontend với cả token và userId
      const redirectUrl = `${CLIENT_ROUTES.LOGIN_SUCCESS}?token=${token}&userId=${user._id}`;
      res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google OAuth error:", err);
      res.redirect(`${CLIENT_ROUTES.LOGIN_FAILURE}?error=google_failed`);
    }
  }
);

export default router;
