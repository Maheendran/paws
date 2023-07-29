import { Request, Response } from "express";
import {
  ClinicCurrentUser,
  ClinicProfileUpdate,
  GroomCurrentUser,
  GroomProfileUpdate,
  PetOwnerCurrentUser,
  UserProfileUpdate,
} from "../../usecases/UserProfile";

export interface AuthenticatedRequest extends Request {
  user?: { _id: string; email: string; accountType: string };
}

export const currentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.accountType === "Grooming") {
      const user = await GroomCurrentUser(req.user?._id);

      res.send(user);
    } else if (req.user?.accountType === "PetOwner") {
      const user = await PetOwnerCurrentUser(req.user?._id);
      res.send(user);
    } else if (req.user?.accountType === "Clinic") {
      const user = await ClinicCurrentUser(req.user?._id);

      res.send(user);
    }
  } catch (error: any) {
    res.send({ message: error.message });
  }
};

export const UpdatecurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "PetOwner") {
      const user = await UserProfileUpdate(req.user?._id, req.body);

      res.send(user);
    } else if (req.user?.accountType === "Grooming") {
      const user = await GroomProfileUpdate(req.user?._id, req.body);

      res.send(user);
    } else if (req.user?.accountType === "Clinic") {
      const user = await ClinicProfileUpdate(req.user?._id, req.body);

      res.send(user);
    }
  } catch (error: any) {
    res.send({ message: error.message });
  }
};

export const AccountVerify = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log(req.files, "filesss");
  } catch (error: any) {
    res.send({ message: error.message });
  }
};
