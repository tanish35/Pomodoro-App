import express from "express";
import { saveStats, fetchStats } from "../controllers/statsControllers.js";

const router = express.Router();

router.post("/", saveStats).get("/:id", fetchStats);

export default router;
