import express from "express";
import prisma from "../lib/prisma.js";
import {
  saveStats,
  fetchStats,
  fetchHistory,
} from "../controllers/statsControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, saveStats).get("/:id", fetchStats);
router.get("/history/:id", fetchHistory);

router.get("/bulkdata", checkAuth, async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const stats = await prisma.History.findUnique({
      where: {
        username,
      },
      select: {
        date: true,
        timeStudied: true,
      },
    });
    res.json({
      date: stats.date,
      timeStudied: stats.timeStudied,
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});
export default router;
