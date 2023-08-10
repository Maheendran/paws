import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/common/welcome/WelcomePage";
import ChooseProfile from "../pages/common/chooseProfile/ChooseProfile";
import Registration from "../pages/common/registration/Registration";

import OtpPage from "../pages/common/otpPage/OtpPage";
import PrivateOtproute from "../components/ProtetctedRoutes/PrivateOtproute";
import HomePage from "../pages/petOwner/HomePage/HomePage";
import PetOwnerPR from "../components/ProtetctedRoutes/PetOwnerPR";
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
import DoctorPage from "../pages/clinic/Doctors/DoctorPage";
import BookingPage from "../pages/clinic/Booking/BookingPage";
import SearchPage from "../pages/common/SearchPage/SearchPage";
import ClinicDetail from "../pages/petOwner/ServiceDetails/ClinicDetail";
import GroomingDetail from "../pages/petOwner/ServiceDetails/GroomingDetail";
import ServicePage from "../pages/Groom/Service/ServicePage";

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

        {/*================= PetOwner================== */}
        <Route
          path="/pet-owner"
          element={<PetOwnerPR Component={HomePage} />}
        />
        <Route
          path="/search/:type"
          element={<PetOwnerPR Component={SearchPage} />}
        />
        <Route
          path="/clinic-detail/:service/:id"
          element={<PetOwnerPR Component={ClinicDetail} />}
        />
        <Route
          path="/grooming-detail/:service/:id"
          element={<PetOwnerPR Component={GroomingDetail} />}
        />

        {/* ====================grooming========================== */}
        <Route path="/grooming" element={<GroomPR Component={GroomHome} />} />
        <Route path="/service" element={<GroomPR Component={ServicePage} />} />


        {/* ====================common page===================== */}
        <Route path="/userprofile" element={<CommonPR Component={Profile} />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/*" element={<ErrorPage />} />

        {/* ==============================clinic ===========================*/}
        <Route path="/doctors" element={<ClinicPR Component={DoctorPage} />} />
        <Route path="/clinic" element={<ClinicPR Component={BookingPage} />} />
      
        
      </Routes>
    </>
  );
};

export default AllRoutes;
