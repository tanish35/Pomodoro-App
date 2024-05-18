import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.Authorization;
    const decoded = jwt.verify(token, process.env.SECRET);
    if (Date.now() >= decoded.exp) {
      res.sendStatus(410);
      return;
    }
    const user = await prisma.User.findUnique({
      where: {
        id: decoded.sub,
      },
    });
    if (!user) {
      res.sendStatus(401);
      return;
    }
    req.user = user;

    next();
  } catch (err) {
    res.sendStatus(401);
    return;
  }
}

export default requireAuth;
