import { Router } from "express";
import { login } from "../controllers/authController";
import {
  allUserDetail,
  allGroomDetail,
  allClinicDetail,
  accountBlocking,
  verficationDoctor,
  verifiedProfile,
} from "../controllers/userController";
import { adminAuthentication } from "../../middlewares/authMiddleware";

const adminRoute = Router();

adminRoute.post("/login", login);
adminRoute.get("/allPetOwners", adminAuthentication, allUserDetail);
adminRoute.get("/allGrooming", adminAuthentication, allGroomDetail);
adminRoute.get("/allClinic", adminAuthentication, allClinicDetail);
// account blocking
adminRoute.post("/account-Block", adminAuthentication, accountBlocking);
// verfication
adminRoute.get("/verfication-doctor", adminAuthentication, verficationDoctor);
// update verified or reject
adminRoute.post("/verified-profile", adminAuthentication, verifiedProfile);

export default adminRoute;
