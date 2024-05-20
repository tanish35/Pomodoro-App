import express from "express";
import {
  saveStats,
  fetchStats,
  fetchHistory,
  fetchBulkData,
} from "../controllers/statsControllers.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, saveStats).get("/:id", fetchStats);
router.get("/history/:id", fetchHistory);
router.get("/bulkdata", checkAuth, fetchBulkData);
//fetchBulkData is a route that will display the History with which the graph can be made
export default router;
