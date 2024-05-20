import express from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { registerUser, loginUser } from "../controllers/userController.js";
import asyncHandler from "express-async-handler";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.put(
  "/update",
  checkAuth,
  asyncHandler(async (req, res) => {
    try {
      const { username, name } = req.body;
      if (!username || !name) {
        return res.status(422).json({ error: "Please add all the fields" });
      }

      const user = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          name,
          username,
        },
      });
      res.json({
        username: user.username,
        name: user.name,
        email: user.email,
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to update user" });
    }
  })
);
router.put(
  "/updatepassword",
  checkAuth,
  asyncHandler(async (req, res) => {
    try {
      const { password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8);
      if (!password) {
        return res.status(422).json({ error: "Please add all the fields" });
      }
      const user = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          password: hashedPassword,
        },
      });
      res.json({
        username: user.username,
        name: user.name,
        email: user.email,
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to update user" });
    }
  })
);

router.get(
  "/bulk",
  asyncHandler(async (req, res) => {
    let filter = req.query.filter || "";
    filter = filter.replace(/^"|"$/g, "");

    const users = await prisma.User.findMany({
      where: {
        OR: [
          {
            username: {
              contains: filter,
              mode: "insensitive",
            },
          },
        ],
      },
      select: {
        id: true,
        username: true,
        Stats: {
          select: {
            totalTimeStudied: true,
            maxTimeStudied: true,
            streak: true,
          },
        },
      },
    });
    res.json({
      users,
    });
  })
);
export default router;
