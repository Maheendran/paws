import { Router } from "express";
import { login } from "../controllers/authController";
import {
  allUserDetail,
  allGroomDetail,
  allClinicDetail,
  accountBlocking,
} from "../controllers/userController";
import { adminAuthentication } from "../../middlewares/authMiddleware";

const adminRoute = Router();

adminRoute.post("/login", login);

adminRoute.get("/allPetOwners", adminAuthentication, allUserDetail);
adminRoute.get("/allGrooming", adminAuthentication, allGroomDetail);
adminRoute.get("/allClinic", adminAuthentication, allClinicDetail);

// account blocking
adminRoute.post("/account-Block", adminAuthentication, accountBlocking);

export default adminRoute;
