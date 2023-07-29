import { AuthSlice } from "./Slice/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserDetailSlice from "./Slice/UserDetailSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    user: UserDetailSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
