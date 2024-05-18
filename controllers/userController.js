import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  if (!name || !email || !password) {
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
  const user = await prisma.User.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    });
  } else {
    return res.status(500).json({ error: "Failed to register user" });
  }
});

export { registerUser };
