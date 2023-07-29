import React from "react";
import "./NavbarPet.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { useAppDispatch } from "../../../Redux/Store";
import { logoutUser } from "../../../Redux/Slice/AuthSlice";
const NavbarPet: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/register");
  };
  return (
    <>
      <div className="navbar_main container-fluid">
        <div className="row">
          <div className="col-3 nav_logo">
            <NavLink to={"/pet-owner"}>
              <img className="img-fluid" src="../assests/logo.png" alt="" />
            </NavLink>
          </div>

          <div className="col-6 d-flex justify-content-center m-auto">
            <button className="mx-2 nav_head_btn">clinic</button>

            <button className="mx-2 nav_head_btn">groom</button>
          </div>

          <div className="col-3 text-end d-flex justify-content-end m-auto">
            <button className="btn logout_btn ">
              <BiLogOutCircle size={"1.5rem"} onClick={handleLogout} />
            </button>
            <NavLink to={"/userprofile"}>
              <div className=" me-auto nav_head_profile">
                <img
                  src="https://th.bing.com/th/id/OIP.PJZfVyqI_1Pfc9A8i--VWQHaHa?pid=ImgDet&rs=1"
                  alt=""
                />
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPet;
