import { AddressInterface } from "../entites/AddressModel";
import { DoctorInterface } from "../entites/DoctorModel";
import {
  deleteClinicSlot,
  findAlldoctors,
  findByIdDeleteDoctor,
  findByIdUpdatedDoctor,
  findClinicByEmail,
  findClinicById,
  findGroomByEmail,
  findGroomingById,
  findOneClinic,
  findOneGrooming,
  findPetOwnerById,
  findUserByEmail,
  findservicesaddress,
  getAllClinic,
  getAllClinicByAddress,
  getAllGroomByAddress,
  getAllGrooming,
  getClinicSlot,
  getUseraddress,
  saveAddress,
  saveClinicSlot,
  saveDoctor,
  updateAddress,
  updateClinicById,
  updateClinicSlot,
  updateGroomingById,
  updateUserById,
} from "../repositories/userRepo";
import cloudinary from "cloudinary";
export const GroomCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findGroomingById(datas);
    if (existingUser) {
      const address = await getUseraddress(existingUser._id);
      return {
        status: "success",
        message: "profile matching and address matching ",
        userdata: existingUser,
        address: address,
      };
    }
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
      address: {},
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const PetOwnerCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findPetOwnerById(datas);
    if (existingUser) {
      const address = await getUseraddress(existingUser._id);
      return {
        status: "success",
        message: "profile matching and address matching ",
        userdata: existingUser,
        address: address,
      };
    }
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
      address: {},
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const ClinicCurrentUser = async (datas: any) => {
  try {
    const existingUser = await findClinicById(datas);
    if (existingUser) {
      const address = await getUseraddress(existingUser._id);
      return {
        status: "success",
        message: "profile matching and address matching ",
        userdata: existingUser,
        address: address,
      };
    }
    return {
      status: "success",
      message: "profile matching",
      userdata: existingUser,
      address: {},
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//===================== update profile pic===============
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
    if (values?.image) {
      const uploadResponse = await cloudinary.v2.uploader.upload(values.image);
      values.profileImage = uploadResponse.url;
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
    if (values?.image) {
      const uploadResponse = await cloudinary.v2.uploader.upload(values.image);
      values.profileImage = uploadResponse.url;
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
    if (values?.image) {
      const uploadResponse = await cloudinary.v2.uploader.upload(values.image);
      values.profileImage = uploadResponse.url;
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

// ========== address===================
export const PetOwnerAddress = async (data: AddressInterface) => {
  try {
    const { _id, ...updateVale } = data;

    const result = await updateAddress(_id, updateVale);
    return {
      status: "success",
      message: "update address",
      address: result,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const CreateNewAddress = async (datas: AddressInterface) => {
  try {
    const address = await saveAddress(datas);
    return {
      status: "success",
      message: "address created",
      address: address,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getserviceAddress = async (serviceId: string) => {
  try {
    const address = await findservicesaddress(serviceId);

    if (address) {
      return {
        status: "success",
        message: "address matching ",
        serviceAddress: address,
      };
    } else {
      return {
        status: "error",
        message: "not address matching",
        address: {},
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ============== doctor CRUD===============
export const CreateDoctor = async (datas: DoctorInterface) => {
  try {
    const doctor = await saveDoctor(datas);
    return {
      status: "success",
      message: "New profile created",
      doctor: doctor,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const GetallDoctor = async (datas: string) => {
  try {
    const doctor = await findAlldoctors(datas);
    return {
      status: "success",
      message: "doctors list",
      doctor: doctor,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const UpdatecurrentDoctor = async (datas: DoctorInterface) => {
  try {
    const { _id, ...othervalue } = datas;

    const doctor = await findByIdUpdatedDoctor(_id, othervalue);
    return {
      status: "success",
      message: "Updated doctor",
      doctor: doctor,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const Deletedoctor = async (doctorId: string) => {
  try {
    const doctor = await findByIdDeleteDoctor(doctorId);

    return {
      status: "success",
      message: "Deleted profile",
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ================================services======================================//
export const getNerestClinic = async () => {
  try {
    const clinic = await getAllClinic();
    return {
      status: "success",
      message: "all clinic data",
      searchdata: clinic,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
// =======get nearest grooming show all list
export const getNerestGrooming = async () => {
  try {
    const groom = await getAllGrooming();
    return {
      status: "success",
      message: "all grooming data",
      searchdata: groom,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// search by user for service
export const getsearchClinic = async (place: string) => {
  try {
    const value = {
      city: place,
    };
    const clinic = await getAllClinicByAddress(value);
    return {
      status: "success",
      message: "all clinic data",
      searchdata: clinic,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getsearchGrooming = async (place: string) => {
  try {
    const value = {
      city: place,
    };
    const clinic = await getAllGroomByAddress(value);
    return {
      status: "success",
      message: "all clinic data",
      searchdata: clinic,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get a detailpage of clinic

export const getClinicdetail = async (id: string) => {
  try {
    const clinic = await findOneClinic(id);
    return {
      status: "success",
      message: "clinic data",
      detail: clinic,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const getGroomdetail = async (id: string) => {
  try {
    const groom = await findOneGrooming(id);
    return {
      status: "success",
      message: "groom data",
      detail: groom,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get time slots
type optionValueType = {
  date: string;
  clinicId: string;
  doctorId: string;
};
export const getDoctorTime = async (optionValue: optionValueType) => {
  try {
    const timeslots = await getClinicSlot(optionValue);
    if (timeslots.length > 0) {
      return {
        status: "success",
        message: "time data",
        timslots: timeslots,
      };
    } else {
      return {
        status: "error",
        message: "time data",
        timslots: [],
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// user booking slot
export type clinicDetail = {
  id: string;
  user_id: string;
  date: string;
  time: string;
  clinicId: string;
  doctorId: string;
  status: string;
  reason: string;
};

export const bookingClinic = async (
  data: clinicDetail,
  id: string | undefined
) => {
  try {
    const optionValue = {
      date: data.date,
      clinicId: data.clinicId,
      doctorId: data.doctorId,
    };

    const clinicSlot = await getClinicSlot(optionValue);

    if (clinicSlot.length > 0) {
      const updatevalue = {
        user_id: id,
        time: data.time,
        status: "booked",
        reason: "",
      };

      const slot = await updateClinicSlot(optionValue, updatevalue);
      console.log(slot, "ipdted");
      return {
        status: "success",
        message: "clinic slot",
        slot: slot,
      };
    } else {
      const slotdata = {
        date: data.date,
        clinicId: data.clinicId,
        doctorId: data.doctorId,
        Bookings: [
          {
            user_id: id,
            time: data.time,
            status: "booked",
            reason: "",
          },
        ],
      };
      const slot = await saveClinicSlot(slotdata);

      return {
        status: "success",
        message: "clinic slot",
        slot: slot,
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// cancel clinic slot

export const clinicSlotCancel = async (data: clinicDetail) => {
  try {
    const result = await deleteClinicSlot(data);
    return {
      status: "success",
      message: "Slot cancelled",
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
