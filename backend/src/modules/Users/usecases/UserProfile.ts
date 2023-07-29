import {
  findClinicByEmail,
  findClinicById,
  findGroomByEmail,
  findGroomingById,
  findPetOwnerById,
  findUserByEmail,
  updateClinicById,
  updateGroomingById,
  updateUserById,
} from "../repositories/userRepo";

export const GroomCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findGroomingById(datas);
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const PetOwnerCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findPetOwnerById(datas);
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const ClinicCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findClinicById(datas);
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// profile update
// export  const GroomProfileUpdate = async (id:string,values:any) => {
//   try {
//     const value = { $set: {...values} };
//     const updaedUser = await updateGroomingById(id,value);
//     console.log(updaedUser,"updaedUser")
//     return {
//       status: "success",
//       message: "profile matching",
//       userdata:updaedUser
//     };

//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

export const UserProfileUpdate = async (id: string, values: any) => {
  try {
    if (values?.email || values?.mobile) {
      const emailExisit = await findUserByEmail(values.email, values.mobile);
      if (emailExisit && emailExisit._id !== id && emailExisit.verified) {
        if (emailExisit.email === values.email) {
          return {
            status: "error",
            message: "Email already exisit",
          };
        }
        if (emailExisit.mobile == values.mobile) {
          return {
            status: "error",
            message: "Mobile already exisit",
          };
        }
      }
    }
    const value = { $set: { ...values } };
    const updaedUser = await updateUserById(id, value);
    return {
      status: "success",
      message: "profile updated",
      userdata: updaedUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const GroomProfileUpdate = async (id: string, values: any) => {
  try {
    if (values?.email || values?.mobile) {
      const emailExisit = await findGroomByEmail(values.email, values.mobile);
      if (emailExisit && emailExisit._id !== id && emailExisit.verified) {
        if (emailExisit.email === values.email) {
          return {
            status: "error",
            message: "Email already exisit",
          };
        }
        if (emailExisit.mobile == values.mobile) {
          return {
            status: "error",
            message: "Mobile already exisit",
          };
        }
      }
    }
    const value = { $set: { ...values } };
    const updaedUser = await updateGroomingById(id, value);
    return {
      status: "success",
      message: "profile updated",
      userdata: updaedUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const ClinicProfileUpdate = async (id: string, values: any) => {
  try {
    if (values?.email || values?.mobile) {
      const emailExisit = await findClinicByEmail(values.email, values.mobile);
      if (emailExisit && emailExisit._id !== id && emailExisit.verified) {
        if (emailExisit.email === values.email) {
          return {
            status: "error",
            message: "Email already exisit",
          };
        }
        if (emailExisit.mobile == values.mobile) {
          return {
            status: "error",
            message: "Mobile already exisit",
          };
        }
      }
    }
    const value = { $set: { ...values } };
    const updaedUser = await updateClinicById(id, value);
    return {
      status: "success",
      message: "profile updated",
      userdata: updaedUser,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
