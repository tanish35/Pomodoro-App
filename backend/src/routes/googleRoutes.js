import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "../google/auth.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).send("Failed to login");
    }
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: req.user.id, exp }, process.env.SECRET);
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      secure: true,
      useHttpOnly: true,
      sameSite: "lax",
    });
    res.send("Logged in with Google");
  }
);

router.get("/login", (req, res) => {
  res.send("Failed to login");
});

export default router;
