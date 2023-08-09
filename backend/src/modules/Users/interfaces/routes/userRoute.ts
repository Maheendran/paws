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
  updateAddress,
  UpdatecurrentUser,
  createAddress,
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctors,
  nerestService,
  searchByUser,
  serviceDetail,
  clinicBooking,
  doctorTimeslot,
  cancelBooking,
  getAddress,
} from "../controllers/userProfileController";
const userRoute = Router();
userRoute.post("/register", userRegister);
userRoute.post("/verify-otp", otpVerification);
userRoute.post("/resend-otp", resendOtp);
userRoute.post("/login", userLogin);
userRoute.post("/google-signIn", googleSignIn);
userRoute.post("/forgot-password", forgotPasswordOtp);
userRoute.post("/reset-password", resetPassword);
userRoute.post("/account-verification",checkIsUserAuthenticated, AccountVerify);
// ===============user profile================
userRoute.get("/current-User", checkIsUserAuthenticated, currentUser);
userRoute.post("/UpdatecurrentUser",checkIsUserAuthenticated, UpdatecurrentUser);
// update profile================
userRoute.post("/UpdateProfilepic",checkIsUserAuthenticated,UpdatecurrentUser);
userRoute.post("/update-address", checkIsUserAuthenticated, updateAddress);
userRoute.post("/create-address", checkIsUserAuthenticated, createAddress);

// not working address=*************
userRoute.get( "/get-service-address/:serviceId", checkIsUserAuthenticated, getAddress);
//===================== clinic doctors add============================//
userRoute.post("/add-doctor", checkIsUserAuthenticated, addDoctor);
userRoute.get("/get-doctors", checkIsUserAuthenticated, getDoctors);
userRoute.post("/update-doctor", checkIsUserAuthenticated, updateDoctor);
userRoute.post("/delete-doctor", checkIsUserAuthenticated, deleteDoctors);
// // ==============================services==============================//
userRoute.get("/nerest-services/:service", checkIsUserAuthenticated,nerestService);
userRoute.get("/searching", checkIsUserAuthenticated, searchByUser);
userRoute.get("/service-detail/:service/:id",checkIsUserAuthenticated,serviceDetail);
//============ get doctor time slot==============
userRoute.post("/doctor-timeslot", checkIsUserAuthenticated, doctorTimeslot);
// ===========booking clinic===========
userRoute.post("/booking-clinic", checkIsUserAuthenticated, clinicBooking);
// ==========cancel clinic booking======
userRoute.post("/cancel-booking", checkIsUserAuthenticated, cancelBooking);

export default userRoute;
