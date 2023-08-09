import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { Outlet, useNavigate } from "react-router-dom";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";
import ClinicNav from "../../pages/clinic/Navbar/ClinicNav";
import LoadingComp from "../loading/LoadingComp";
import { getcurrentUser } from "../../Redux/Slice/UserDetailSlice";

const ClinicPR = (props: any) => {
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);
  const { Component } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!auth.token) {
      navigate("/choose-profile");
    }
dispatch(getcurrentUser()).then((data) => {
  if (data.payload.status === "token") {
    localStorage.removeItem("token");
    return navigate("/register");
  }
  if (data.payload.status === "success" && data.payload.userdata) {
    if (data.payload.userdata?.blocked===true) {
      localStorage.removeItem("token");
      navigate("/register");
    }
    if(data.payload.userdata.accountType==='petOwner'){
      navigate("/pet-owner");
    }
    else if(data.payload.userdata.accountType==='Grooming'){
      navigate("/grooming");
    }else{
      <Outlet />;
    }
  } 
});    
  },[]);
  return (
    <div>

      {user.userloading ? <LoadingComp/>:
      <>
          <ClinicNav/>
      <Component />
      </>
  
  }
    </div>
  );
};

export default ClinicPR;
