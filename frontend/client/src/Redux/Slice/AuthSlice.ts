
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import jwtDecode from "jwt-decode";
import { googlelogin } from "../../components/LoginFrom/LoginForm";

export interface UserData {
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  shopName: string;
  ownerName: string;
  clinicName: string;
}
interface currentState {
  token: string;
  status: string;
  message: string;
  choosePerson: string;
  email: string;
  username: string;
  _id: string;
  loading: boolean;
  otpVerified: string;
  otpTime: string | number;
  otpType: string;
}
const initialState: currentState = {
  token: localStorage.getItem("token") || "",
  status: "",
  message: "",
  choosePerson: localStorage.getItem("choosePerson") || "",
  email: localStorage.getItem("email") || "",
  username: "",
  loading: false,
  _id: localStorage.getItem("_id") || "",
  otpVerified: localStorage.getItem("otpVerified") || "",
  otpTime: localStorage.getItem("otpTime") || "",
  otpType: "",
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const datas = await axios.post("http://localhost:5000/register", data);
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const googlesignIn = createAsyncThunk(
  "auth/googlesignIn",
  async (data: googlelogin, { rejectWithValue }) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/google-signIn",
        data
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpvalues: any, { rejectWithValue }) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/verify-otp",
        otpvalues
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (otpvalues: any, { rejectWithValue }) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/resend-otp",
        otpvalues
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
interface loginInterface {
  email: string;
  password: string;
}
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: loginInterface, { rejectWithValue }) => {
    try {
      const datas = await axios.post("http://localhost:5000/login", data);
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const forgotpasswordOtp = createAsyncThunk(
  "auth/forgotpasswordOtp",
  async (otpvalues: any, { rejectWithValue }) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/forgot-password",
        otpvalues
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
interface resetpassInterface {
  id: string;
  password: string;
  accountType: string;
}
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetvalues: resetpassInterface, { rejectWithValue }) => {
    try {
      const datas = await axios.post(
        "http://localhost:5000/reset-password",
        resetvalues
      );
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const AuthSlice= createSlice({
  name: "auth",
  initialState,
  reducers: {
    currentUserDetail: (state) => {
      const token = state.token;
      if (token) {
        const user: any = jwtDecode(token);
        return {
          ...state,
          choosePerson: user.accountType,
          username: user.name,
          email: user.email,
          _id: user._id,
        };
      }

      return state;
    },
    loadPage: (state) => {
      return {
        token: localStorage.getItem("token") || "",
        status: "",
        message: "",
        choosePerson: localStorage.getItem("choosePerson") || "",
        email: "",
        username: "",
        loading: false,
        _id: localStorage.getItem("user_id") || "",
        otpVerified: localStorage.getItem("otpVerified") || "",
        otpTime: localStorage.getItem("otpTime") || 0,
        otpType: "",
      };
    },
    choosePerson: (state, action: PayloadAction<{ value: string }>) => {
      localStorage.setItem("choosePerson", action.payload.value);
      return {
        ...state,
        choosePerson: localStorage.getItem("choosePerson") || "",
      };
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("choosePerson");
      return {
        token: "",
        status: "",
        message: "",
        choosePerson: "",
        email: "",
        username: "",
        loading: false,
        _id: "",
        otpVerified: "",
        otpTime: "",
        otpType: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;

      if (action.payload?.data) {
        state.email = action.payload.data.email;
        localStorage.setItem("email", state.email);
        state._id = action.payload.data._id;
        localStorage.setItem("_id", state._id);
        state.otpVerified = "verified";
        localStorage.setItem("otpVerified", "verified");
        state.otpTime = Date.now();
        localStorage.setItem("otpTime", JSON.stringify(state.otpTime));
      }
    });
    // ==============================//

    builder.addCase(verifyOtp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
      if (state.status === "success") {
        localStorage.removeItem("_id");
        localStorage.removeItem("otpTime");
        localStorage.removeItem("otpVerified");
        localStorage.removeItem("email");
      }
    });

    // resend otp

    builder.addCase(resendOtp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resendOtp.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
      if (state.status === "success") {
        state.email = localStorage.getItem("email") || "";
        state.otpVerified = "verified";
        localStorage.setItem("otpVerified", "verified");
        state.otpTime = Date.now();
        console.log(state.otpTime, "success dter signup");
        localStorage.setItem("otpTime", JSON.stringify(state.otpTime));
      }
    });
    // forgotpassord
    builder.addCase(forgotpasswordOtp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotpasswordOtp.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;

      if (state.status === "success") {
        state._id = action.payload.data._id;
        localStorage.setItem("_id", state._id);
        state.email = localStorage.getItem("email") || "";
        state.otpVerified = "verified";
        localStorage.setItem("otpVerified", "verified");
        state.otpTime = Date.now();
        localStorage.setItem("otpTime", JSON.stringify(state.otpTime));
        state.otpType = action.payload.otpType;
      }
    });

    // ==========login================//

    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
      if (action.payload?.data) {
        state.email = action.payload.data.email;
        state.token = action.payload.token;
        state.choosePerson = action.payload.accountType;
        localStorage.setItem("token", state.token);
      }
    });
    // google login

    builder.addCase(googlesignIn.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(googlesignIn.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
      if (action.payload.status === "success") {
        state.token = action.payload?.token;
        localStorage.setItem("token", action.payload?.token);
      }
    });

    // reset password
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.loading = false;
    });
  },
});

export default AuthSlice.reducer;
export const { choosePerson, loadPage, currentUserDetail, logoutUser } =
  AuthSlice.actions;
