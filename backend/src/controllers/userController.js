import asyncHandler from "express-async-handler";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SMTPClient, Message } from 'emailjs';

let data = {};

const emailServer = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true,
});

function sendOtpEmail(to, otp) {
  const message = new Message({
    text: `Your OTP is: ${otp}`,
    from: `Promodoro Tech Team ${process.env.EMAIL_USER}`,
    to: to,
    subject: 'Your OTP Code'
  });

  emailServer.send(message, (err, message) => {
    if (err) {
      console.log(err);
    } else {
      console.log('OTP sent successfully:', message);
    }
  });
}

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
  data =  {
    name,
    email,
    username,
    password: hashedPassword,
  };
  
  handleOtpGeneration();
});

let otpData = null;

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60000);


  return {
    otp,
    expiresAt
  };
}

function handleOtpGeneration() {
  const otpInfo = generateOTP();
  const {email} = data;
  storeOTP(otpInfo);
  sendOtpEmail(email, otpInfo.otp);
  return { otp: otpInfo.otp, expiresAt: otpInfo.expiresAt };

}

// Store OTP
function storeOTP(otpInfo) {
  otpData = otpInfo;
}

// Verify OTP
function verifyOTP(inputOtp) {
  if (!otpData) {
    return { isValid: false, message: "No OTP generated." };
  }

  const now = new Date();
  if (now > otpData.expiresAt) {
    otpData = null; // OTP expired
    return { isValid: false, message: "OTP expired." };
  }

  if (inputOtp === otpData.otp) {
    otpData = null; // OTP valid and used
    return { isValid: true, message: "OTP is valid." };
  }

  return { isValid: false, message: "Invalid OTP." };
}

const handleVerifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: 'OTP is required' });
  }

  const verificationResult = verifyOTP(otp);

  if (verificationResult.isValid) {
    res.json({ message: verificationResult.message });
    const user = await prisma.User.create({
      data: data,
    })
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      });
    } else {
      return res.status(500).json({ error: "Failed to register user" });
    }
  } else {
    res.status(400).json({ message: verificationResult.message });
  }
})

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

export {
  registerUser,
  loginUser,
  handleOtpGeneration,
  handleVerifyOTP,
  signOut,
  updateFields,
  updatepassword,
  filterUsers,
  updatePicture,
};
