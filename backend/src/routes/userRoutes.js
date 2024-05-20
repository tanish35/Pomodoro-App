import express from "express";
import {
  registerUser,
  loginUser,
  signOut,
  updateFields,
  updatepassword,
  filterUsers,
  updatePicture,
  verifyUser,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/signout").get(signOut);
router.put("/update", checkAuth, updateFields);
router.put("/updatepassword", checkAuth, updatepassword);
router.get("/bulk", filterUsers); //filterUsers is a route which you can use to search users
router.get("/verify/:token", verifyUser);
router.put("/updatepicture", checkAuth, updatePicture);

export default router;
