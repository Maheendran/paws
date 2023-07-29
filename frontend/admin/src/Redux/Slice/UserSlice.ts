// import { usersList } from './../../../../../backend/src/modules/Admin/usecases/userUsecase';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setHeaders } from "../Api";
import axios from "axios";

type userList = {
  _id: string;
  accountType: string;
  createdBy: string;
  email: string;
  mobile: string;
  otp: string;
  password: string;
  username: string;
  verified: boolean;
};

interface initalInterface {
  petOwnerList: userList[];
  loading: boolean;
  groomingList: userList[];
  clinicList: userList[];
  status: string;
  message: string;
}

const initialState: initalInterface = {
  petOwnerList: [],
  loading: false,
  groomingList: [],
  clinicList: [],
  status: "",
  message: "",
};

export const getAllPetOwner = createAsyncThunk("user/getPetOwner", async () => {
  try {
    const datas = await axios.get(
      "http://localhost:5000/admin/allPetOwners",
      setHeaders()
    );
    return datas.data;
  } catch (error: any) {
    console.log(error.message);
  }
});

export const getAllGroomings = createAsyncThunk(
  "user/getAllGroomings",
  async () => {
    try {
      const datas = await axios.get(
        "http://localhost:5000/admin/allGrooming",
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const getAllClinic = createAsyncThunk("user/getAllClinic", async () => {
  try {
    const datas = await axios.get(
      "http://localhost:5000/admin/allClinic",
      setHeaders()
    );
    return datas.data;
  } catch (error: any) {
    console.log(error.message);
  }
});

//  account blocked==============
type data = {
  id: string;
  accountType: string;
  blocked: boolean;
};
export const AccountBlock = createAsyncThunk(
  "user/AccountBlock",
  async (value: data) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/admin/account-Block",
        value,
        setHeaders()
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPetOwner.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPetOwner.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.petOwnerList = action.payload.usersList;
    });
    // get all grooming
    builder.addCase(getAllGroomings.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllGroomings.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.groomingList = action.payload.usersList;
    });
    // get all clinic
    builder.addCase(getAllClinic.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllClinic.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.clinicList = action.payload.usersList;
    });

    // block and unblock
    // builder.addCase(AccountBlock.pending, (state, action) => {
    //   state.loading=true

    // });
    // builder.addCase(AccountBlock.fulfilled, (state, action) => {
    //   state.status=action.payload.status
    //   state.message=action.payload.message
    // });
  },
});

export default userSclice.reducer;
