import express from "express";
import { saveStats } from "../controllers/statsControllers.js";

const router = express.Router();

router.post("/", saveStats).get("/", (req, res) => {
  res.send("Hello from statsRoutes.js");
});

export default router;
