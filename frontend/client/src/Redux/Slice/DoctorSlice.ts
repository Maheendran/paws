
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders } from "../Api";

export type doctorDetail ={
  _id:string,
clinicId:string,
name:string,
specialized:string,
qualification:string,
experience:string,
document:string,
verified:string
profileImage:string
}
interface initialInterface{
doctorsList:doctorDetail[],
doctorloading:boolean,
doctorStatus:string,
doctorMessage:string
}

const initialState:initialInterface={
  doctorsList:[],
doctorloading:false,
doctorStatus:"",
doctorMessage:""
}
export const CreateDoctor = createAsyncThunk(
    "doctor/CreateDoctor",
    async (doctordata: Partial<doctorDetail>) => {
      try {
        const datas = await axios.post(
          "http://localhost:5000/add-doctor",
          doctordata,
          setHeaders()
        );
        return datas.data;
      } catch (error: any) {
        console.log(error.message);
      }
    }
  );
  export const GetallDoctors = createAsyncThunk(
    "doctor/GetallDoctors",
    async () => {
      try {
        const datas = await axios.get(
          "http://localhost:5000/get-doctors",
          setHeaders()
        );
        return datas.data;
      } catch (error: any) {
        console.log(error.message);
      }
    }
  );
  export const UpdateDoctor = createAsyncThunk(
    "doctor/UpdateDoctor",
    async (updateData:any) => {
      try {
        const datas = await axios.post(
          "http://localhost:5000/update-doctor",
          updateData,
          setHeaders()
        );
        return datas.data;
      } catch (error: any) {
        console.log(error.message);
      }
    }
  );
  export const DocotorDelete = createAsyncThunk(
    "doctor/DocotorDelete",
    async (doctor:any) => {
   
      try {
        const datas = await axios.post(
          "http://localhost:5000/delete-doctor",
          doctor,
          setHeaders()
        );
        return datas.data;
      } catch (error: any) {
        console.log(error.message);
      }
    }
  );
  
  


export const DoctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(CreateDoctor.pending, (state, action) => {
        state.doctorloading = true;
      });
      builder.addCase(CreateDoctor.fulfilled, (state, action) => {
        state.doctorloading = false;
      });

      // get all doctors
      builder.addCase(GetallDoctors.pending, (state, action) => {
        state.doctorloading = true;
      });
      builder.addCase(GetallDoctors.fulfilled, (state, action) => {
        state.doctorloading = false;
        state.doctorStatus=action.payload.status
        state.doctorsList=action.payload.doctor
        state.doctorMessage=action.payload.message
      });
//  update doctor

builder.addCase(UpdateDoctor.pending, (state, action) => {
  state.doctorloading = true;
});
builder.addCase(UpdateDoctor.fulfilled, (state, action) => {
  state.doctorloading = false;
  state.doctorStatus=action.payload.status
  state.doctorMessage=action.payload.message
});
// delete doctor

builder.addCase(DocotorDelete.pending, (state, action) => {
  state.doctorloading = true;
});
builder.addCase(DocotorDelete.fulfilled, (state, action) => {
  state.doctorloading = false;
  state.doctorStatus=action.payload.status
  state.doctorMessage=action.payload.message
});
  
    },
  });
  
  export default DoctorSlice.reducer;
  