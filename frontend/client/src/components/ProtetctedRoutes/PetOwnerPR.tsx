import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { Outlet, useNavigate } from "react-router-dom";
import { getcurrentUser } from "../../Redux/Slice/UserDetailSlice";
import LoadingComp from "../loading/LoadingComp";
const PetOwnerPR = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getcurrentUser()).then((data) => {
      console.log(data.payload, "petowner pr");
      if (data.payload.status === "token") {
        localStorage.removeItem("token");
        return navigate("/register");
      }
      if (data.payload.status === "success" && data.payload.userdata) {
        if (data.payload.userdata.blocked) {
          localStorage.removeItem("token");
          navigate("/register");
        }
      } else {
        <Outlet />;
      }
    });
  }, []);

  return <>{user.userloading ? <LoadingComp /> : <Component />}</>;
};

export default PetOwnerPR;
