import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/common/welcome/WelcomePage";
import ChooseProfile from "../pages/common/chooseProfile/ChooseProfile";
import Registration from "../pages/common/registration/Registration";

import OtpPage from "../pages/common/otpPage/OtpPage";
import PrivateOtproute from "../components/ProtetctedRoutes/PrivateOtproute";
import HomePage from "../pages/petOwner/HomePage/HomePage";

import PetOwnerPR from "../components/ProtetctedRoutes/PetOwnerPR";
import ClinicHome from "../pages/clinic/HomePage/ClinicHome";
import ClinicProfile from "../pages/clinic/Profile/ClinicProfile";
import ClinicPR from "../components/ProtetctedRoutes/ClinicPR";
import GroomHome from "../pages/Groom/Homepage/GroomHome";
import GroomProfile from "../pages/Groom/Profile/GroomProfile";
import GroomPR from "../components/ProtetctedRoutes/GroomPR";
import ErrorPage from "../pages/common/ErrorPage/ErrorPage";
import OtpPR from "../components/ProtetctedRoutes/OtpPR";
import ForgotPass from "../pages/common/ForgotPass/ForgotPass";
import Profile from "../pages/common/Profile/Profile";
import CommonPR from "../components/ProtetctedRoutes/CommonPR";
import Verification from "../pages/common/Verfication/Verification";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateOtproute Component={WelcomePage} />} />
        <Route
          path="/choose-profile"
          element={<PrivateOtproute Component={ChooseProfile} />}
        />
        <Route
          path="/register"
          element={<PrivateOtproute Component={Registration} />}
        />
        <Route path="/reset-password" element={<ForgotPass />} />
        <Route path="/otp" element={<OtpPR Component={OtpPage} />} />

        {/* PetOwner */}

        <Route
          path="/pet-owner"
          element={<PetOwnerPR Component={HomePage} />}
        />

        {/* clinic */}

        <Route path="/clinic" element={<ClinicPR Component={ClinicHome} />} />
        <Route
          path="/clinic-profile"
          element={<ClinicPR Component={ClinicProfile} />}
        />

        {/* grooming */}
        <Route path="/grooming" element={<GroomPR Component={GroomHome} />} />
        <Route path="/groom-profile" element={<GroomProfile />} />

        {/* common page */}

        <Route path="/userprofile" element={<CommonPR Component={Profile} />} />
        <Route path="/verification" element={<Verification />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
