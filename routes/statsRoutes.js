import express from "express";
import { saveStats, fetchStats } from "../controllers/statsControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, saveStats).get("/:id", fetchStats);

export default router;
