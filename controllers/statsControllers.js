import prisma from "../lib/prisma.js";
import asyncHandler from "express-async-handler";

const saveStats = asyncHandler(async (req, res) => {
  const { id, minutes } = req.body;
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const stats1 = await prisma.Stats.findMany({
      where: {
        userId: id,
      },
    });

    const stats = stats1[0];

    if (stats) {
      await prisma.Stats.update({
        where: {
          id: stats.id,
        },
        data: {
          totalTimeStudied: stats.totalTimeStudied + Number(minutes),
          maxTimeStudied: Math.max(stats.maxTimeStudied, Number(minutes)),
        },
      });
    } else {
      await prisma.Stats.create({
        data: {
          totalTimeStudied: Number(minutes),
          maxTimeStudied: Number(minutes),
          user: {
            connect: {
              id: id,
            },
          },
        },
      });
    }
    res.send("Stats saved");
  } catch (error) {
    console.error("Error saving stats:", error);
    res.status(500).send("Error saving stats");
  }
});

const fetchStats = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const stats = await prisma.Stats.findMany({
      where: {
        userId: id,
      },
    });
    res.send(stats[0]);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send("Error fetching stats");
  }
});

export { saveStats, fetchStats };
