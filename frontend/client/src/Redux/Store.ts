import { AuthSlice } from "./Slice/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserDetailSlice from "./Slice/UserDetailSlice";
import DoctorSlice from "./Slice/DoctorSlice";
import ServiceSlice from "./Slice/ServiceSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    user: UserDetailSlice,
    doctor:DoctorSlice,
    service:ServiceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
