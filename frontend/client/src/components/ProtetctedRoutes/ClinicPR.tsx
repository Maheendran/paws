import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { Outlet, useNavigate } from "react-router-dom";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";

const ClinicPR = (props: any) => {
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
    if (auth?.choosePerson === "Clinic") {
      <Outlet />;
    } else {
      if (auth?.choosePerson === "PetOwner") {
        navigate("/pet-owner");
      } else {
        navigate("/grooming");
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

export default ClinicPR;
