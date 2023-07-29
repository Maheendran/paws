import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/LoginPage/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Navbar from "../components/Navbar/Navbar";
import Accounts from "../pages/Accounts/Accounts";
import AuthPR from "../components/PrivateRoute/AuthPR";
import UnAuthPR from "../components/PrivateRoute/UnAuthPR";

const AllRoutes: React.FC = () => {
  return (
    <>
      {/* <Navbar/> */}

      <Routes>
        <Route path="/login" element={<UnAuthPR Component={Login} />} />
        <Route path="/" element={<AuthPR Component={Dashboard} />} />
        <Route path="/account" element={<AuthPR Component={Accounts} />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
