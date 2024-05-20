import express from "express";
import {
  registerUser,
  loginUser,
  signOut,
  updateFields,
  updatepassword,
  filterUsers,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/signout").get(signOut);
router.put("/update", checkAuth, updateFields);
router.put("/updatepassword", checkAuth, updatepassword);
router.get("/bulk", filterUsers);
//filterUsers is a route which you can use to search users
export default router;
