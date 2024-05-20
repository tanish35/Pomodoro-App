import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "tanishmajumdar2912@gmail.com",
    pass: "AbgTxFyH9G16vsmz",
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
