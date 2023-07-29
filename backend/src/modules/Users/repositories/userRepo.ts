import { verifyEmail } from "../../../services/MailSender";
import ClinicModel, { ClinicInterface } from "../entites/ClinicModel";
import GroomModel, { GroomInterface } from "../entites/GroomModel";
import userModel, { UserInterface } from "../entites/userModel";
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
// google save ===================
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
// update user by id==================
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
// find by id and delete
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
