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
  address: string;
  blocked: boolean;
  shopName: string;
  ownerName: string;
  wallet: number;
  clinicName: string;
};

interface initalInterface {
  currentUser: Partial<userList>;
  token: string;
  userStatus: string;
  userMessage: string;
  userloading: boolean;
}

const initialState: initalInterface = {
  currentUser: {},
  token: localStorage.getItem("token") || "",
  userStatus: "",
  userMessage: "",
  userloading: false,
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
      // console.log(action.payload,"action=============")
      state.currentUser = action.payload?.userdata || {};
    });
    builder.addCase(UpdatecurrentUser.pending, (state, action) => {
      // state.loading=true
    });
    builder.addCase(UpdatecurrentUser.fulfilled, (state, action) => {
      state.userStatus = action.payload.status;
      state.userMessage = action.payload.message;
      if (action.payload?.userdata) {
        state.currentUser = action.payload?.userdata;
      }
    });
  },
});

export default UserDetailSlice.reducer;
