import { userList } from './UserDetailSlice';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "../Api";

interface docTimeslot{
  _id:string
  user_id:string
time: string
date: string
clinicId :string
doctorId :string
status :string
reason :string
Bookings:any
}
interface currentState {
  serviceStatus: string;
  serviceMessage: string;
  serviceList:userList[];
  serviceloading:boolean;
  serviceDetail:Partial<userList>[];
  timeslots:docTimeslot[]
}
const initialState: currentState = {
  serviceloading:false,
  serviceStatus: "",
  serviceMessage: "",
  serviceList: [],
  serviceDetail:[],
  timeslots:[]
};

export const getNerestService = createAsyncThunk(
  "service/getNerestService",
  async (value: string | undefined, { rejectWithValue }) => {
    try {
      const datas = await axios.get(`http://localhost:5000/nerest-services/${value}`,setHeaders());
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// seacrh place
export const SearchPlace = createAsyncThunk(
  "service/SearchPlace",
  async ({ searchValue, servicetype }: { searchValue: string, servicetype: string | undefined }) => {
    try {
      const datas = await axios.get(`http://localhost:5000/searching?service=${servicetype}&place=${searchValue}`,setHeaders());
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// get clinic details
export const getclinicDetail = createAsyncThunk(
  "service/getclinicDetail",
  async ({ service, clinicId }: { service: string; clinicId: string | undefined} ) => {
    try {
      const datas = await axios.get(`http://localhost:5000/service-detail/${service}/${clinicId}`,setHeaders());
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);




// get doctors time slots===========================
type formdatatype={
  date:string,clinicId:string | undefined,doctorId:string
}
export const getDoctorTimeslot = createAsyncThunk(
  "service/getDoctorTimeslot",
  async (formdata:formdatatype) => {

    try {
      const datas = await axios.post("http://localhost:5000/doctor-timeslot",formdata,
      setHeaders());
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);


// Book slot for clinic
type formdataType={
  clinicId:string | undefined;
  doctorId:string | undefined;
  date:string
  time:string
  bookingId:string
}

export const BookClinicSlot = createAsyncThunk(
  "service/BookClinicSlot",
  async (formdata:Partial<formdataType>) => {
    try {
      const datas = await axios.post("http://localhost:5000/booking-clinic",formdata,setHeaders());
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// cancel booking slot
// date,clinicId,doctorId,bookingId
export const cancellingslot = createAsyncThunk(
  "service/cancellingslot",
  async (formdata: Partial<formdataType>) => {
    try {
      const datas = await axios.post("http://localhost:5000/cancel-booking",formdata,setHeaders());
      return datas.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// get service address


// export const serviceAddress = createAsyncThunk(
//   "service/serviceAddress",
//   async (clinicId:string) => {
//     console.log(clinicId,"formdata=============")
//     try {
//       const datas = await axios.get(`http://localhost:5000/get-service-address/${clinicId}`,setHeaders());
//       return datas.data;
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }
// );




export const ServiceSlice= createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNerestService.pending, (state, action) => {
      state.serviceloading = true;
    });
    builder.addCase(getNerestService.fulfilled, (state, action) => {

      state.serviceStatus = action.payload.status;
      state.serviceMessage = action.payload.message;
      state.serviceloading = false;
      state.serviceList=action.payload.searchdata
    });

    // get detail page
    builder.addCase(getclinicDetail.pending, (state, action) => {
      state.serviceloading = true;
    });

    builder.addCase(getclinicDetail.fulfilled, (state, action) => {
      state.serviceStatus = action.payload?.status;
      state.serviceMessage = action.payload?.message;
      state.serviceloading = false;
      state.serviceDetail=action.payload?.detail
    });
    // get time slots===================
    
    builder.addCase(getDoctorTimeslot.pending, (state, action) => {
      state.serviceloading = true;
    });
    builder.addCase(getDoctorTimeslot.fulfilled, (state, action) => {
      state.serviceStatus = action.payload?.status;
      state.serviceMessage = action.payload?.message;
      state.serviceloading = false;
      state.timeslots=action.payload?.timslots
    });
    // ccancel slot
    
    builder.addCase(cancellingslot.pending, (state, action) => {
      state.serviceloading = true;
    });
    builder.addCase(cancellingslot.fulfilled, (state, action) => {
      state.serviceStatus = action.payload?.status;
      state.serviceMessage = action.payload?.message;
      state.serviceloading = false;
    });

  },
});

export default ServiceSlice.reducer;

