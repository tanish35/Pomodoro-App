import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import statsRoutes from "./routes/statsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json());

// app.use(
//     cors({
//       origin: "http://localhost:3001", // Replace with the URL of your React app
//       credentials: true, // Enable credentials (cookies)
//     })
//   );
app.use(cookieParser());

app.use("/api/stats", statsRoutes);

// app.get("/createUser", async (req, res) => {
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         email: "example@example.com",
//         password: "password123",
//         name: "Alice",
//       },
//     });
//     res.json(newUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).send("Error creating user");
//   }
// });

app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
