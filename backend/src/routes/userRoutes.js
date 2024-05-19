import express from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { registerUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.put("/update", async (req, res) => {
    try {
        const {username, name, email } = req.body;
        if (!username || !name || !email) {
            return res.status(422).json({ error: "Please add all the fields" });
        }

        const user = await prisma.user.update({
            where: {
                email,
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
    

});
router.put("/updatePassword", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        if (!email || !password) {
            return res.status(422).json({ error: "Please add all the fields" });
        }
        const user = await prisma.user.update({
            where: {
                email,
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
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: filter,
                mode: 'insensitive', 
              },
            }
          ],
        },
        select: {
          username: true,
          totalTimeStudied: true,
          maxTimeStudied: true,
          streak: true
        },
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            totalTimeStudied: user.totalTimeStudied,
            maxTimeStudied: user.maxTimeStudied,
            streak: user.streak
        }))
    })
})
export default router;
