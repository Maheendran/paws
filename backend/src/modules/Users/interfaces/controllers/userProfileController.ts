import { Request, Response } from "express";
import {
  ClinicCurrentUser,
  ClinicProfileUpdate,
  CreateDoctor,
  CreateNewAddress,
  Deletedoctor,
  GetallDoctor,
  GroomCurrentUser,
  GroomProfileUpdate,
  PetOwnerAddress,
  PetOwnerCurrentUser,
  UpdatecurrentDoctor,
  UserProfileUpdate,
  bookingClinic,
  clinicSlotCancel,
  getClinicdetail,
  getDoctorTime,
  getGroomdetail,
  getNerestClinic,
  getNerestGrooming,
  getsearchClinic,
  getsearchGrooming,
  getserviceAddress,
} from "../../usecases/UserProfile";

import { errorHandler } from "../../middlewares/errorMiddleware";

import cloudinary from "cloudinary";

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
    errorHandler(error, req, res);
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
    errorHandler(error, req, res);
  }
};

export const AccountVerify = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    console.log(req.files, "filesss");
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// update address
export const updateAddress = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (
      req.user?.accountType === "PetOwner" ||
      req.user?.accountType === "Grooming" ||
      req.user?.accountType === "Clinic"
    ) {
      const result = await PetOwnerAddress(req.body);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// createAddress
export const createAddress = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (
      req.user?.accountType === "PetOwner" ||
      req.user?.accountType === "Grooming" ||
      req.user?.accountType === "Clinic"
    ) {
      const result = await CreateNewAddress(req.body);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// get current user addres

export const getAddress = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { serviceId } = req.params;

    console.log(serviceId, "serviceId");

    const result = await getserviceAddress(serviceId);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// ===============add doctor

export const addDoctor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.accountType === "Clinic") {
      if (req.body.profileImage) {
        const value = req.body.profileImage;
        const uploadResponse = await cloudinary.v2.uploader.upload(value);
        req.body.profileImage = uploadResponse.url;
      }
      if (req.body.document) {
        const value = req.body.document;
        const uploadResponse = await cloudinary.v2.uploader.upload(value);
        req.body.document = uploadResponse.url;
      }
      const data = {
        ...req.body,
        clinicId: req.user._id,
      };

      const result = await CreateDoctor(data);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// get all doctors
export const getDoctors = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user?.accountType === "Clinic") {
      const result = await GetallDoctor(req.user?._id);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
// update doctor
export const updateDoctor = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "Clinic") {
      const result = await UpdatecurrentDoctor(req.body);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
// delete doctor
export const deleteDoctors = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (req.user?.accountType === "Clinic") {
      const result = await Deletedoctor(req.body.doctorId);

      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
// ========================serivces===========================//
export const nerestService = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { service } = req.params;
    if (service === "clinic") {
      const result = await getNerestClinic();
      res.send(result);
    } else {
      const result = await getNerestGrooming();
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// seacrh place by user==================PENDING SEARCH*****************
export const searchByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { service, place } = req.query;

    if (service === "clinic") {
      const result = await getsearchClinic(place as string);
      res.send(result);
    } else {
      const result = await getsearchGrooming(place as string);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// get service detail page
export const serviceDetail = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { service, id } = req.params;

    if (service === "clinic") {
      const result = await getClinicdetail(id);
      res.send(result);
    } else {
      const result = await getGroomdetail(id);
      res.send(result);
    }
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// get time slot of doctores

export const doctorTimeslot = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await getDoctorTime(req.body);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// booking=========================================//
export const clinicBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await bookingClinic(req.body, req.user?._id);
    res.send(result);

    // ================================================//
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};

// clinic cancel booking================
export const cancelBooking = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await clinicSlotCancel(req.body);
    res.send(result);
  } catch (error: any) {
    errorHandler(error, req, res);
  }
};
