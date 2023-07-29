import React, { useEffect } from "react";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";

const GroomPR = (props: any) => {
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.token) {
      navigate("/choose-profile");
    }
    dispatch(currentUserDetail());
  }, []);

  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authcheck = () => {
    if (auth?.choosePerson === "Grooming") {
      <Outlet />;
    } else {
      if (auth?.choosePerson === "PetOwner") {
        navigate("/pet-owner");
      } else {
        navigate("/clinic");
      }
    }
  };
  authcheck();
  return (
    <div>
      <Component />
    </div>
  );
};

export default GroomPR;
