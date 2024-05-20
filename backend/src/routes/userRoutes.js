import express from "express";
import {
  registerUser,
  loginUser,
  handleOtpGeneration,
  handleVerifyOTP,
  resetPassword,
  verifyResetPasswordOTP,
  updatePassword,
  signOut,
  updateFields,
  updatepassword,
  filterUsers,
  updatePicture,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();

// To verify email while registering
router.route("/register").post(registerUser);

router.get('/generate-otp', (req, res) => {
  const {otp, expiresAt} = handleOtpGeneration();
  res.json({ otp, expiresAt });
});

router.route("/verify-otp").post(handleVerifyOTP);

// To verify email while reseting password / forgot password
router.route('/reset-password').post(resetPassword);
router.route('/verify-reset-password-otp').post(verifyResetPasswordOTP);
router.route('/update-password').post(updatePassword);

router.route("/login").post(loginUser);
router.route("/signout").get(signOut);
router.put("/update", checkAuth, updateFields);
router.put("/changepassword", checkAuth, updatepassword);
router.get("/bulk", filterUsers);
router.put("/updatepicture", checkAuth, updatePicture);
//filterUsers is a route which you can use to search users
export default router;
