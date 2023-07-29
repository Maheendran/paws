import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";
const PrivateOtproute = (props: any) => {
  const { Component } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(currentUserDetail());
    if (!auth.token) {
      <Outlet />;
    } else {
      if (auth?.choosePerson === "PetOwner") {
        navigate("/pet-owner");
      } else {
        if (auth?.choosePerson === "Clinic") {
          navigate("/clinic");
        } else {
          navigate("/grooming");
        }
      }
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateOtproute;
