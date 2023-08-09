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

type doctorType={
  clinicId:string,
name:string,
specialized:string,
qualification:string,
experience:string,
document:string,
verified:boolean
docVerified:boolean
}

interface initalInterface {
  petOwnerList: userList[];
  loading: boolean;
  groomingList: userList[];
  clinicList: userList[];
  status: string;
  message: string;
  doctorsList:doctorType[]
}

const initialState: initalInterface = {
  petOwnerList: [],
  loading: false,
  groomingList: [],
  clinicList: [],
  status: "",
  message: "",
  doctorsList:[]
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

// get all unverfied doctors
export const UnverifiedDoctor = createAsyncThunk("user/UnverifiedDoctor", async () => {
  try {
    const datas = await axios.get(
      "http://localhost:5000/admin/verfication-doctor",
      setHeaders()
    );
    return datas.data;
  } catch (error: any) {
    console.log(error.message);
  }
});

// verified and reject
type datas={
  doctorId:string,
  verified:string
}
export const checkVerification = createAsyncThunk("user/Verification", async (data:any) => {
  try {
    const datas = await axios.post(
      "http://localhost:5000/admin/verified-profile",
      data,
      setHeaders()
    );
    return datas.data;
  } catch (error: any) {
    console.log(error.message);
  }
});


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
      state.loading = false;
    });
    // get all grooming
    builder.addCase(getAllGroomings.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllGroomings.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.groomingList = action.payload.usersList;
      state.loading = false;
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
// get verification
builder.addCase(UnverifiedDoctor.pending, (state, action) => {
  state.loading = true;
});
builder.addCase(UnverifiedDoctor.fulfilled, (state, action) => {
  console.log(action.payload,"verifivction")
  state.loading = false;
  state.status = action.payload.status;
  state.message = action.payload.message;
  state.doctorsList = action.payload.doctor;

});

// verfied and reject 
builder.addCase(checkVerification.pending, (state, action) => {
  state.loading = true;
});
builder.addCase(checkVerification.fulfilled, (state, action) => {
  state.loading = false;
  state.status = action.payload.status;
  state.message = action.payload.message;

});


  },
});

export default userSclice.reducer;
