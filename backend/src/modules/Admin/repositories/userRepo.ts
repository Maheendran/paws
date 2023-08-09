import ClinicModel, { ClinicInterface } from "../../Users/entites/ClinicModel";
import DoctorModel, { DoctorInterface } from "../../Users/entites/DoctorModel";
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

// unverified doctor account
export const findAlldoctors = async (verified: string) => {
  return await DoctorModel.find({ verified: verified });
};


// update doctor
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
