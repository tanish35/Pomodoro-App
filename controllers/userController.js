import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
    return res.status(422).json({ error: "User already exists" });
  }
  const usernameExists = await prisma.User.findUnique({
    where: {
      username,
    },
  });
  if (usernameExists) {
    return res.status(422).json({ error: "Username already exists" });
  }
  const user = await prisma.User.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
    },
  });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      pic: user.pic,
    });
  } else {
    return res.status(500).json({ error: "Failed to register user" });
  }
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
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    res.sendStatus(401);
    return;
  }
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const token = jwt.sign({ sub: user.id, exp }, process.env.SECRET);
  res.cookie("Authorization", token, {
    expires: new Date(exp),
    secure: false,
    useHttpOnly: true,
    sameSite: "lax",
  });
  delete user.password;
  res.json(user);
});

export { registerUser, loginUser };
