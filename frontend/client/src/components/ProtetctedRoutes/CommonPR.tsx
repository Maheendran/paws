import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import { currentUserDetail } from "../../Redux/Slice/AuthSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { getcurrentUser } from "../../Redux/Slice/UserDetailSlice";
interface CommonPRProps {
  Component: React.FC<{}>;
}

const CommonPR: React.FC<CommonPRProps> = ({ Component }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("common route");
    dispatch(getcurrentUser()).then((data) => {
      if (data.payload.status === "token") {
        localStorage.removeItem("token");
        return navigate("/register");
      }
      if (data.payload.status === "success" && data.payload.userdata) {
        if (data.payload.userdata.blocked) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      } else {
        <Outlet />;
      }
    });
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};

export default CommonPR;
