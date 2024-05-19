import express from "express";
import {
  saveStats,
  fetchStats,
  fetchHistory,
} from "../controllers/statsControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, saveStats).get("/:id", fetchStats);
router.get("/history/:id", fetchHistory);
export default router;
