import React, { useEffect } from "react";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import LoadingComp from "../loading/LoadingComp";
import { getcurrentUser } from "../../Redux/Slice/UserDetailSlice";
import GroomProfile from "../../pages/Groom/Profile/GroomProfile";

const GroomPR = (props: any) => {
  const user = useAppSelector((state) => state.user);
  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
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
        if(data.payload.userdata.accountType==='PetOwner'){
          navigate("/pet-owner");
        }
        else if(data.payload.userdata.accountType==='Clinic'){
          navigate("/clinic");
        }else{
          <Outlet />;
        }
      } 
    });
  }, []);
  return (
    <div>

      {user.userloading ? <LoadingComp/>:
      <>
  
          <GroomProfile/>
      <Component />
      </>
  
  }
    </div>
  );
};

export default GroomPR;
