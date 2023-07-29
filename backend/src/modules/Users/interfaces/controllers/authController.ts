import { Request, Response } from "express";

import {
  ClinicUser,
  GroomUser,
  CreateUser,
  GroomUserOtp,
  PetOwnerOtp,
  ClinicOwnerOtp,
  GroomResendOtp,
  UserResendOtp,
  ClinicResendOtp,
  loginuser,
  loginGroom,
  loginClinic,
  googlePetOwner,
  googleClinic,
  googleGroom,
  forgotUserOtp,
  forgotGroomOtp,
  forgotClinicOtp,
  resetPasswordUser,
  resetPasswordGroom,
  resetPasswordClinic,
} from "../../usecases/userAuth";

export const userRegister = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "Grooming") {
      const user = await GroomUser(req.body);

      res.send(user);
    } else if (req.body.accountType === "PetOwner") {
      const user = await CreateUser(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await ClinicUser(req.body);
      res.send(user);
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
};

export const otpVerification = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "Grooming") {
      const user = await GroomUserOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "PetOwner") {
      const user = await PetOwnerOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await ClinicOwnerOtp(req.body);
      res.send(user);
    }
  } catch (error: any) {
    console.error(error);
    res.json({ message: error.message });
  }
};

export const resendOtp = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "Grooming") {
      const user = await GroomResendOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "PetOwner") {
      const user = await UserResendOtp(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await ClinicResendOtp(req.body);
      res.send(user);
    }
  } catch (error: any) {
    console.error(error);
    res.json({ message: error.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    if (req.body.accountType === "Grooming") {
      const user = await loginGroom(req.body);
      res.send(user);
    } else if (req.body.accountType === "PetOwner") {
      const user = await loginuser(req.body);
      res.send(user);
    } else if (req.body.accountType === "Clinic") {
      const user = await loginClinic(req.body);
      res.send(user);
    }
  } catch (error: any) {
    console.error(error);
    res.json({ message: error.message });
  }
};
// jwt check current user
export const googleSignIn = async (req: Request, res: Response) => {
  if (req.body.accountType === "PetOwner") {
    const user = await googlePetOwner(req.body);
    res.send(user);
  } else if (req.body.accountType === "Grooming") {
    const user = await googleGroom(req.body);
    res.send(user);
  } else if (req.body.accountType === "Clinic") {
    const user = await googleClinic(req.body);
    res.send(user);
  }
};
// forgot password otp sending
export const forgotPasswordOtp = async (req: Request, res: Response) => {
  if (req.body.accountType === "PetOwner") {
    const user = await forgotUserOtp(req.body);
    res.send(user);
  } else if (req.body.accountType === "Grooming") {
    const user = await forgotGroomOtp(req.body);
    res.send(user);
  } else if (req.body.accountType === "Clinic") {
    const user = await forgotClinicOtp(req.body);
    res.send(user);
  }
};
// pending===============
export const resetPassword = async (req: Request, res: Response) => {
  if (req.body.accountType === "PetOwner") {
    const user = await resetPasswordUser(req.body);
    res.send(user);
  } else if (req.body.accountType === "Grooming") {
    const user = await resetPasswordGroom(req.body);
    res.send(user);
  } else if (req.body.accountType === "Clinic") {
    const user = await resetPasswordClinic(req.body);
    res.send(user);
  }
};
