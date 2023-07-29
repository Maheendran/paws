import { Request, Response } from "express";
import {
  checkBlockAccount,
  clinicList,
  groomingList,
  usersList,
} from "../../usecases/userUsecase";

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
    res.send({ message: error.message });
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
    res.send({ message: error.message });
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
    res.send({ message: error.message });
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
    res.send({ message: error.message });
  }
};
