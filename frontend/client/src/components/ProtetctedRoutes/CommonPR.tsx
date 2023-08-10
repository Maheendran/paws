import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector, } from "../../Redux/Store";

import { Outlet, useNavigate } from "react-router-dom";
import { getcurrentUser } from "../../Redux/Slice/UserDetailSlice";
import ClinicNav from "../../pages/clinic/Navbar/ClinicNav";
import NavbarPet from "../../pages/petOwner/Navbar/NavbarPet";
import GroomProfile from "../../pages/Groom/Profile/GroomProfile";
interface CommonPRProps {
  Component: React.FC<{}>;
}
const CommonPR: React.FC<CommonPRProps> = ({ Component }) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {    
    dispatch(getcurrentUser()).then((data) => {
      if (data.payload.status === "token"){
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

{user.currentUser.accountType==='Clinic' &&   <ClinicNav/>}

{user.currentUser.accountType==='PetOwner' &&   <NavbarPet/>}
{user.currentUser.accountType==='Grooming' &&   <GroomProfile/>}
      <Component />
    </div>
  );
};

export default CommonPR;
