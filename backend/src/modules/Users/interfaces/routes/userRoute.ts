import { Router } from "express";
import {
  userRegister,
  otpVerification,
  resendOtp,
  userLogin,
  googleSignIn,
  forgotPasswordOtp,
  resetPassword,
} from "../controllers/authController";
import { checkIsUserAuthenticated } from "../../middlewares/authMiddleware";
import {
  AccountVerify,
  currentUser,
  UpdatecurrentUser,
} from "../controllers/userProfileController";
import { upload } from "../../middlewares/multer";
const userRoute = Router();
userRoute.post("/register", userRegister);
userRoute.post("/verify-otp", otpVerification);
userRoute.post("/resend-otp", resendOtp);
userRoute.post("/login", userLogin);

userRoute.post("/google-signIn", googleSignIn);

userRoute.post("/forgot-password", forgotPasswordOtp);
userRoute.post("/reset-password", resetPassword);

userRoute.post(
  "/account-verification",
  checkIsUserAuthenticated,
  AccountVerify
);

userRoute.get("/current-User", checkIsUserAuthenticated, currentUser);

userRoute.post(
  "/UpdatecurrentUser",
  checkIsUserAuthenticated,
  UpdatecurrentUser
);
export default userRoute;
