import {
  findallClinic,
  findallGrooming,
  findallUsers,
  petOwnerAccount,
  updateClinicById,
  updateGroomingById,
  updatePetOwnerById,
} from "../repositories/userRepo";

export const usersList = async () => {
  try {
    const allusers = await findallUsers();
    return {
      status: "success",
      message: "login success",
      usersList: allusers,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const groomingList = async () => {
  try {
    const allusers = await findallGrooming();
    return {
      status: "success",
      message: "login success",
      usersList: allusers,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const clinicList = async () => {
  try {
    const allusers = await findallClinic();
    return {
      status: "success",
      message: "login success",
      usersList: allusers,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//
interface blockAccount {
  id: string;
  accountType: string;
  blocked: boolean;
}
export const checkBlockAccount = async (data: blockAccount) => {
  try {
    if (data.blocked) {
      var values = { $set: { blocked: false } };
    } else {
      var values = { $set: { blocked: true } };
    }

    const id = data.id;
    let updatedaccount;
    if (data.accountType === "Grooming") {
      updatedaccount = await updateGroomingById(id, values);
    } else if (data.accountType === "PetOwner") {
      updatedaccount = await updatePetOwnerById(id, values);
    } else if (data.accountType === "Clinic") {
      updatedaccount = await updateClinicById(id, values);
    }

    return {
      status: "success",
      message: "account blocked",
      account: updatedaccount,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
