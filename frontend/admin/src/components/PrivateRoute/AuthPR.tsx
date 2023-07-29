import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";

interface AuthPRProps {
  Component: React.ComponentType<any>;
}
const AuthPR: React.FC<AuthPRProps> = (props: any) => {
  const { Component } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(currentUserDetail());
    if (auth.token && auth.choosePerson === "admin") {
      <Outlet />;
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default AuthPR;
