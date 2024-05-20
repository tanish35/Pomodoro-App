import express from "express";
import {
  registerUser,
  loginUser,
  handleOtpGeneration,
  handleVerifyOTP,
  signOut,
  updateFields,
  updatepassword,
  filterUsers,
  updatePicture,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

router.route("/register").post(registerUser);

router.get('/generate-otp', (req, res) => {
  const {otp, expiresAt} = handleOtpGeneration();
  res.json({ otp, expiresAt });
});

router.route("/verify-otp").post(handleVerifyOTP);

router.route("/login").post(loginUser);
router.route("/signout").get(signOut);
router.put("/update", checkAuth, updateFields);
router.put("/updatepassword", checkAuth, updatepassword);
router.get("/bulk", filterUsers);
router.put("/updatepicture", checkAuth, updatePicture);
//filterUsers is a route which you can use to search users
export default router;
