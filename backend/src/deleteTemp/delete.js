import prisma from "../lib/prisma.js";
import express from "express";
const router = express.Router();
router.get("/", async (req, res) => {
  await deleteTemp();
  res.sendStatus(200);
});

const deleteTemp = async () => {
  await prisma.TempUser.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
};

export default router;
