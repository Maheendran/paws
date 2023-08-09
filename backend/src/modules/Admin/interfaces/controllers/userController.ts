import { Request, Response } from "express";
import {
  checkBlockAccount,
  clinicList,
  getAllUnverifiedDoc,
  groomingList,
  updateDoctorVerification,
  // updateDoctorProfile,
  usersList,
} from "../../usecases/userUsecase";
import { errorHandler } from "../../middlewares/errorMiddleware";

export interface AuthenticatedRequest extends Request {
  user?: { _id: string; email: string; accountType: string };
}

export const allUserDetail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await usersList();
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

export const allGroomDetail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await groomingList();
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

export const allClinicDetail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await clinicList();
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

//
export const accountBlocking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "admin") {
      const result = await checkBlockAccount(req.body);

      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// /verification
export const verficationDoctor = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log("new  result=======");
    const verified = "pending";
    const result = await getAllUnverifiedDoc(verified);
    console.log(result, "result=======");

    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// update verification
export const verifiedProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await updateDoctorVerification(req.body);
    res.send(result);
  } catch (error: any) {
    errorHandler(error,req,res)
  }
};
