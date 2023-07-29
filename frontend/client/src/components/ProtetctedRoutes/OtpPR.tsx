import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";

const OtpPR = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.otpVerified && !auth.token) {
      navigate("/choose-profile");
    }
    dispatch(currentUserDetail());
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default OtpPR;
