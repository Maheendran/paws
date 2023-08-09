// import { addresList } from './UserDetailSlice';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setHeaders } from "../Api";
import axios from "axios";

export type userList = {
  _id: string;
  accountType: string;
  createdBy: string;
  email: string;
  mobile: string;
  otp: string;
  password: string;
  username: string;
  verified: boolean;
  upi: string;
  blocked: boolean;
  shopName: string;
  ownerName: string;
  wallet: number;
  clinicName: string;
  profileImage: string;
  doctorlist?: any;
  address?:any
};

export type addresList = {
  _id: string;
  userId: string;
  name: string;
  mobile: string;
  adressLine: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  is_default: boolean;
};

interface initalInterface {
  currentUser: Partial<userList>;
  token: string;
  userStatus: string;
  userMessage: string;
  userloading: boolean;
  userAddress: Partial<addresList>;
}

const initialState: initalInterface = {
  currentUser: {},
  token: localStorage.getItem("token") || "",
  userStatus: "",
  userMessage: "",
  userloading: false,
  userAddress: {},
};

// get current user all details
export const getcurrentUser = createAsyncThunk(
  "user/getcurrentUser",
  async () => {
    try {
      const datas = await axios.get(
        "http://localhost:5000/current-User",
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const UpdatecurrentUser = createAsyncThunk(
  "user/UpdatecurrentUser",
  async (currentUser: Partial<userList>) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/UpdatecurrentUser",
        currentUser,
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// update profilepic
export const Updateprofilepic = createAsyncThunk(
  "user/Updateprofilepic",
  async (data: any | ArrayBuffer | null) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/UpdateProfilepic",
        data,
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export interface verificationInterface {
  "id-proof": File | null;
  agreement: File | null;
  image: string | null;
}
export const AccountVerification = createAsyncThunk(
  "user/AccountVerification",
  async (formdata: verificationInterface) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id-proof", formdata["id-proof"] || "");
      formDataToSend.append("agreement", formdata["agreement"] || "");
      const datas = await axios.post(
        "http://localhost:5000/account-verification",
        formDataToSend,
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const Updateaddress = createAsyncThunk(
  "user/Updateaddress",
  async (currentAddress: Partial<addresList>) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/update-address",
        currentAddress,
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const Createaddress = createAsyncThunk(
  "user/Createaddress",
  async (newAddress: Partial<addresList>) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/create-address",
        newAddress,
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// /add-doctor

export const UserDetailSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcurrentUser.pending, (state, action) => {
      state.userloading = true;
    });
    builder.addCase(getcurrentUser.fulfilled, (state, action) => {
      state.userloading = false;
      state.userStatus = action.payload.status;
      state.userMessage = action.payload.message;
      state.currentUser = action.payload?.userdata || {};
      state.userAddress = action.payload?.address || {};
    });

    builder.addCase(getcurrentUser.rejected, (state, action) => {
      state.userloading = false;
    });

    // update user
    builder.addCase(UpdatecurrentUser.pending, (state, action) => {
      state.userloading = true;
    });
    builder.addCase(UpdatecurrentUser.fulfilled, (state, action) => {
      state.userStatus = action.payload.status;
      state.userMessage = action.payload.message;
      state.userloading = false;
      if (action.payload?.userdata) {
        state.currentUser = action.payload?.userdata;
      }
    });

    // update profilepic
    builder.addCase(Updateprofilepic.pending, (state, action) => {
      state.userloading = true;
    });
    builder.addCase(Updateprofilepic.fulfilled, (state, action) => {
      state.userStatus = action.payload.status;
      state.userMessage = action.payload.message;
      state.userloading = false;
      if (action.payload?.userdata) {
        state.currentUser = action.payload?.userdata;
      }
    });

    // Updateaddress
    builder.addCase(Updateaddress.pending, (state, action) => {
      state.userloading = true;
    });
    builder.addCase(Updateaddress.fulfilled, (state, action) => {
      state.userStatus = action.payload.status;
      state.userMessage = action.payload.message;
      state.userloading = false;
      if (action.payload?.address) {
        state.userAddress = action.payload?.address;
      }
    });
    // create new address
    builder.addCase(Createaddress.pending, (state, action) => {
      state.userloading = true;
    });
    builder.addCase(Createaddress.fulfilled, (state, action) => {
      state.userStatus = action.payload.status;
      state.userMessage = action.payload.message;
      state.userloading = false;
      if (action.payload?.address) {
        state.userAddress = action.payload?.address;
      }
    });
  },
});

export default UserDetailSlice.reducer;
