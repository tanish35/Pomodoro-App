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
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
