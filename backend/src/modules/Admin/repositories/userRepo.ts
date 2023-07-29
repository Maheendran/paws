import ClinicModel, { ClinicInterface } from "../../Users/entites/ClinicModel";
import GroomModel, { GroomInterface } from "../../Users/entites/GroomModel";
import userModel, { UserInterface } from "../../Users/entites/userModel";

export const findallUsers = async () => {
  return await userModel.find({ verified: true });
};

export const findallGrooming = async () => {
  return await GroomModel.find({ verified: true });
};

export const findallClinic = async () => {
  return await ClinicModel.find({ verified: true });
};

// ================block and unclock=============
export const petOwnerAccount = async () => {
  return await ClinicModel.find({ verified: true });
};

type UpdateValues = {
  $set: {
    blocked?: boolean;
  };
};
export const updateGroomingById = async (
  id: string,
  values: UpdateValues
): Promise<GroomInterface | null> => {
  return await GroomModel.findByIdAndUpdate(id, values, { new: true });
};
export const updateClinicById = async (
  id: string,
  values: UpdateValues
): Promise<ClinicInterface | null> => {
  return await ClinicModel.findByIdAndUpdate(id, values, { new: true });
};
export const updatePetOwnerById = async (
  id: string,
  values: UpdateValues
): Promise<UserInterface | null> => {
  return await userModel.findByIdAndUpdate(id, values, { new: true });
};
