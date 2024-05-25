import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendMail from "../mail/nodeMailing.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  if (!name || !email || !password || !username) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  const userExists = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }
  const usernameExists = await prisma.User.findUnique({
    where: {
      username,
    },
  });
  if (usernameExists) {
    return res.status(406).json({ error: "Username already exists" });
  }
  const user = await prisma.TempUser.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
      expiresAt: new Date(Date.now() + 1000 * 60 * 5),
    },
  });
  const exp = Date.now() + 1000 * 60 * 5;
  const token = jwt.sign({ sub: user.id, exp }, process.env.SECRET);
  const url = `https://api.tanish.me/api/user/verify/${token}`;
  const htmlContent = `<a href="${url}">Verify using this link</a>`;
  await sendMail(email, htmlContent);
  res.sendStatus(200);
});

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.SECRET);
  const user = await prisma.TempUser.findUnique({
    where: {
      id: decoded.sub,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.expiresAt < new Date()) {
    return res.status(400).json({ error: "Token expired" });
  }
  await prisma.User.create({
    data: {
      name: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
    },
  });
  await prisma.TempUser.delete({
    where: {
      id: decoded.sub,
    },
  });
  res.redirect("https://app.tanish.me/signin");
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await prisma.User.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      password: true,
    },
  });
  if (!user) {
    res.sendStatus(404);
    return;
  }
  if (!user.password) {
    res.status(401).json({
      error: "You have logged in with Google. Please login with Google.",
    });
    return;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.sendStatus(402);
    return;
  }
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const token = jwt.sign({ sub: user.id, exp }, process.env.SECRET);
  res.cookie("Authorization", token, {
    expires: new Date(exp),
    secure: true,
    useHttpOnly: true,
    sameSite: "lax",
  });
  delete user.password;
  res.json(user);
});

const signOut = asyncHandler(async (req, res) => {
  res.clearCookie("Authorization");
  res.sendStatus(200);
});

const updateFields = asyncHandler(async (req, res) => {
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
});

const updatepassword = asyncHandler(async (req, res) => {
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
});

const filterUsers = asyncHandler(async (req, res) => {
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
});

const updatePicture = asyncHandler(async (req, res) => {
  const { pic } = req.body;
  if (!pic) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  const user = await prisma.User.update({
    where: {
      id: req.user.id,
    },
    data: {
      pic,
    },
  });
  res.json({
    picture: user.pic,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.User.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const exp = Date.now() + 1000 * 60 * 5;
  const OTP = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.TempUser.upsert({
    where: {
      email,
    },
    update: {
      OTP,
      expiresAt: new Date(exp),
    },
    create: {
      email,
      OTP,
      expiresAt: new Date(exp),
    },
  });

  const htmlContent = `<h1>${OTP}</h1>`;
  await sendMail(email, htmlContent);
  res.sendStatus(200);
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, OTP, password } = req.body;
  const user = await prisma.TempUser.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.OTP !== OTP) {
    return res.status(401).json({ error: "Invalid OTP" });
  }
  if (user.expiresAt < new Date()) {
    return res.status(400).json({ error: "OTP expired" });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  await prisma.User.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });
  await prisma.TempUser.delete({
    where: {
      email,
    },
  });
  res.sendStatus(200);
});

const fetchUsername = asyncHandler(async (req, res) => {
  const { username } = req.user;
  res.json({ username });
});

export {
  registerUser,
  loginUser,
  signOut,
  updateFields,
  updatepassword,
  filterUsers,
  updatePicture,
  verifyUser,
  forgotPassword,
  resetPassword,
  fetchUsername,
};
