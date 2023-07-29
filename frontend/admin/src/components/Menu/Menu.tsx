import React from "react";
import "../../styles/Menu.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/Store";
import { logoutUser } from "../../Redux/Slice/AuthSlice";
const Menu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlelogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <div className="sidebar bg-dark">
        <i className="bx bx-code-alt"></i>
        <div className="logo-name">
          <span>Asmr</span>Prog
        </div>

        <ul className="side-menu">
          <li className="active">
            <NavLink to={"/"}>
              <i className="bx bx-store-alt"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/account"}>
              <i className="bx bx-store-alt"></i>Accounts
            </NavLink>
          </li>
          <li className="">
            <NavLink to={"/"}>
              <i className="bx bx-store-alt"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/account"}>
              <i className="bx bx-store-alt"></i>Accounts
            </NavLink>
          </li>
          <li className="">
            <NavLink to={"/"}>
              <i className="bx bx-store-alt"></i>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/account"}>
              <i className="bx bx-store-alt"></i>Accounts
            </NavLink>
          </li>
        </ul>
        <ul className="side-menu logout_btn">
          <li onClick={handlelogout}>
            <i className="bx bx-log-out-circle"></i>
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Menu;
