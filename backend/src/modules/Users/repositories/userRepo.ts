import { Types } from "mongoose";
import { verifyEmail } from "../../../services/MailSender";
import AddressModel, { AddressInterface } from "../entites/AddressModel";
import ClinicModel, { ClinicInterface } from "../entites/ClinicModel";
import DoctorModel, { DoctorInterface } from "../entites/DoctorModel";
import GroomModel, { GroomInterface } from "../entites/GroomModel";
import userModel, { UserInterface } from "../entites/userModel";
import { clinicDetail } from "../usecases/UserProfile";
import ClinicSlot from "../entites/ClinicSlot";

// =============create new users=================
export const saveUser = async (
  data: UserInterface
): Promise<{
  status: string;
  message: string;
  data: UserInterface;
  mailStatus: string;
}> => {
  const user = new userModel({ ...data });
  await user.save();
  const mailStatus = await verifyEmail(data.email, data.otp);
  return {
    status: "success",
    message: "created account",
    data: user,
    mailStatus: mailStatus,
  };
};
export const saveGroom = async (
  data: GroomInterface
): Promise<{ status: string; message: string; data: GroomInterface }> => {
  const user = new GroomModel(data);
  await user.save();
  return { status: "success", message: "created account", data: user };
};
export const saveClinic = async (
  data: ClinicInterface
): Promise<{ status: string; message: string; data: ClinicInterface }> => {
  const user = new ClinicModel(data);
  await user.save();

  return { status: "success", message: "created account", data: user };
};
//=========== google save ===================
export const googlesaveUser = async (
  data: UserInterface
): Promise<{
  status: string;
  message: string;
  data: UserInterface;
}> => {
  const user = new userModel({ ...data, verified: true, createdBy: "google" });
  await user.save();

  return {
    status: "success",
    message: "created account",
    data: user,
  };
};
export const googlesaveClinic = async (
  data: ClinicInterface
): Promise<{
  status: string;
  message: string;
  data: ClinicInterface;
}> => {
  const user = new ClinicModel({
    ...data,
    verified: true,
    createdBy: "google",
  });

  await user.save();

  return {
    status: "success",
    message: "created account",
    data: user,
  };
};
export const googlesaveGroom = async (
  data: GroomInterface
): Promise<{
  status: string;
  message: string;
  data: GroomInterface;
}> => {
  const user = new GroomModel({ ...data, verified: true, createdBy: "google" });
  await user.save();

  return {
    status: "success",
    message: "created account",
    data: user,
  };
};

// ==================find user by email and mobile verified false================
export const findUserByEmail = async (
  email: string,
  mobile: string
): Promise<UserInterface | null> => {
  return await userModel.findOne({ $or: [{ email }, { mobile }] }).exec();
};
export const findGroomByEmail = async (
  email: string,
  mobile: string
): Promise<GroomInterface | null> => {
  return await GroomModel.findOne({ $or: [{ email }, { mobile }] }).exec();
};
export const findClinicByEmail = async (
  email: string,
  mobile: string
): Promise<ClinicInterface | null> => {
  return await ClinicModel.findOne({ $or: [{ email }, { mobile }] }).exec();
};
// ==================find user by email and mobile verified false================

export const forgotpassUser = async (
  email: string
): Promise<UserInterface | null> => {
  return await userModel
    .findOne({ $and: [{ email }, { verified: true }, { createdBy: "manual" }] })
    .exec();
};
export const forgotpassClinic = async (
  email: string
): Promise<ClinicInterface | null> => {
  return await ClinicModel.findOne({
    $and: [{ email }, { verified: true }, { createdBy: "manual" }],
  }).exec();
};
export const forgotpassGroom = async (
  email: string
): Promise<GroomInterface | null> => {
  return await GroomModel.findOne({
    $and: [{ email }, { verified: true }, { createdBy: "manual" }],
  }).exec();
};
// ========================find by id======================//
export const findGroomingById = async (
  userId: string
): Promise<GroomInterface | null> => {
  return await GroomModel.findOne({ _id: userId });
};
export const findPetOwnerById = async (
  userId: string
): Promise<UserInterface | null> => {
  return await userModel.findOne({ _id: userId });
};
export const findClinicById = async (
  userId: string
): Promise<ClinicInterface | null> => {
  return await ClinicModel.findOne({ _id: userId });
};
// ==============update user by id==================
type UpdateValues = {
  $set: {
    otp?: string;
    password?: string;
    username?: string;
  };
};
export const updateGroomingById = async (
  datas: string,
  values: UpdateValues
): Promise<GroomInterface | null> => {
  return await GroomModel.findByIdAndUpdate(datas, values, { new: true });
};
export const updateUserById = async (
  datas: string,
  values: UpdateValues
): Promise<UserInterface | null> => {
  return await userModel.findByIdAndUpdate(datas, values, { new: true });
};
export const updateClinicById = async (
  datas: string,
  values: UpdateValues
): Promise<ClinicInterface | null> => {
  return await ClinicModel.findByIdAndUpdate(datas, values, { new: true });
};
// ========================findOne in user model======================//
export const findOneInPetOwner = async (
  checkmodel: any
): Promise<UserInterface | null> => {
  return await userModel.findOne(checkmodel);
};
export const findOneInClinic = async (
  checkmodel: any
): Promise<UserInterface | null> => {
  return await ClinicModel.findOne(checkmodel);
};
export const findOneInGroom = async (
  checkmodel: any
): Promise<UserInterface | null> => {
  return await GroomModel.findOne(checkmodel);
};
// =======find by id and delete================//
export const findByIdDeleteUser = async (
  checkmodel: string
): Promise<UserInterface | null> => {
  return await userModel.findByIdAndDelete(checkmodel);
};
export const findByIdDeleteGroom = async (
  checkmodel: string
): Promise<UserInterface | null> => {
  return await GroomModel.findByIdAndDelete(checkmodel);
};
export const findByIdDeleteClinic = async (
  checkmodel: string
): Promise<UserInterface | null> => {
  return await ClinicModel.findByIdAndDelete(checkmodel);
};
// ===============update addres in addres model===========
export const updateAddress = async (
  _id: string,
  updateVale: Partial<AddressInterface>
): Promise<AddressInterface | null> => {
  return await AddressModel.findByIdAndUpdate(
    { _id },
    { ...updateVale },
    { new: true }
  );
};
export const saveAddress = async (
  data: AddressInterface
): Promise<AddressInterface | null> => {
  const address = new AddressModel({ ...data });
  return await address.save();
};
// ==========get address==================
export const getUseraddress = async (
  userId: string
): Promise<AddressInterface | null> => {
  return await AddressModel.findOne({ userId: userId });
};
export const findservicesaddress = async (
  userId: string
): Promise<AddressInterface | null> => {
  console.log(userId, "service userId");
  return await AddressModel.findOne({ userId: userId });
};

// ========= doctor CRUD===========

export const saveDoctor = async (
  data: DoctorInterface
): Promise<DoctorInterface | null> => {
  const doctor = new DoctorModel(data);
  return await doctor.save();
};
export const findAlldoctors = async (clinicId: string) => {
  return await DoctorModel.find({ clinicId: clinicId });
};
export const findAllVerifiedDoctors = async (
  clinicId: string,
  verified: string
) => {
  return await DoctorModel.find({ clinicId: clinicId, verified: verified });
};
export const findByIdUpdatedDoctor = async (
  Id: String,
  updatedValue: Partial<DoctorInterface>
) => {
  return await DoctorModel.findByIdAndUpdate(
    Id,
    { $set: { ...updatedValue } },
    { new: true }
  );
};
export const findByIdDeleteDoctor = async (doctorId: string) => {
  return await DoctorModel.findByIdAndDelete(doctorId);
};

// ==============================service= pending==================================//
export const getAllClinic = async () => {
  try {
    const clinics = await ClinicModel.aggregate([
      {
        $match: { verified: true },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "userId",
          as: "address",
        },
      },
    ]);
    return clinics;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getAllGrooming = async () => { try {
  const clinics = await GroomModel.aggregate([
    {
      $match: { verified: true },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "userId",
        as: "address",
      },
    },
  ]);
  return clinics;
} catch (error: any) {
  throw new Error(error.message);
}

};

//************* */ get clinic with check with address===============================
export const getAllClinicByAddress = async (value: any) => {
  const cityRegex = new RegExp(value.city, "i");
  return await AddressModel.find({ city: { $regex: cityRegex } });
};
export const getAllGroomByAddress = async (value: any) => {
  const cityRegex = new RegExp(value.city, "i");
  return await AddressModel.find({ city: { $regex: cityRegex } });
};

// =======GET DETAIL PAGE================//
export const findOneClinic = async (id: string) => {
  const ids = new Types.ObjectId(id);
  return await ClinicModel.aggregate([
    { $match: { _id: ids } },
    {
      $lookup: {
        from: "doctors",
        localField: "_id",
        foreignField: "clinicId",
        as: "doctorlist",
      },
    },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "userId",
        as: "address",
      },
    },

    {
      $match: { "doctorlist.verified": "verified" },
    },
  ]);
};
export const findOneGrooming = async (id: string) => {
  return await GroomModel.findOne({ _id: id });
};
//=============get clinicslot==================
type optionValueType = {
  date: string;
  clinicId: string;
};
export const getClinicSlot = async (optionValue: optionValueType) => {
  return await ClinicSlot.aggregate([
    {
      $match: { ...optionValue },
    },
    {
      $lookup: {
        from: "users",
        localField: "Bookings.user_id",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);
};
export const saveClinicSlot = async (slotdata: any) => {
  const slot = new ClinicSlot({ ...slotdata });
  await slot.save();
};
type optionValuetype = {
  date: string;
  clinicId: string;
  doctorId: string;
};
type updatevalueType = {
  user_id: string | undefined;
  time: string;
  status: string;
  reason: string;
};
export const updateClinicSlot = async (
  optionValue: optionValuetype,
  updatevalue: updatevalueType
) => {
  return ClinicSlot.updateOne(
    { ...optionValue },
    { $push: { Bookings: updatevalue } },
    { new: true }
  );
};

// =======================cancel slot ==========================//
export const deleteClinicSlot = async (data: clinicDetail) => {
  return ClinicSlot.updateOne(
    { date: data.date, clinicId: data.clinicId, doctorId: data.doctorId },
    { $pull: { Bookings: { time: data.time } } }
  );
};

