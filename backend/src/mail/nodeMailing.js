import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: process.env.BREVO_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASSWORD,
  },
});

const sendMail = asyncHandler(async (email, url) => {
  const info = await transporter.sendMail({
    from: '"Pomodoro App" <Pomodoro@pomodoro.com>', // sender address
    to: email,
    subject: "URL for verification", // Subject line
    text: "Single use URL",
    html: url,
  });
});

export default sendMail;
