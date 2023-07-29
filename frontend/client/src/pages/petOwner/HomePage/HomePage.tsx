import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { currentUserDetail, logoutUser } from "../../../Redux/Slice/AuthSlice";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarPet from "../Navbar/NavbarPet";
import { motion } from "framer-motion";
import "./HomePage.css";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const animationreverse = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView) {
      animationreverse.start({
        bottom: 0,
        transition: {
          type: "spring",
          duration: 3,
          bounce: 0.2,
        },
      });
    }
    if (!inView) {
      animationreverse.start({
        bottom: "-80vh",
        transition: {
          type: "spring",
          duration: 3,
          bounce: 0.2,
        },
      });
    }
  }, [inView]);

  // ======================
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentUserDetail());
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/choose-profile");
  };

  return (
    <>
      <NavbarPet />
      <div className="user_banner container-fluid">
        <div
          id="carouselExampleControls"
          className="carousel slide "
          data-ride="carousel"
        >
          <div className="carousel-inner  ">
            <div className="carousel-item active inner_carousel">
              <img
                className="d-block w-100"
                src="https://images.template.net/66383/Pet-Clinic-Billboard-Template.jpeg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item  inner_carousel">
              <img
                className="d-block w-100"
                src="https://onaircode.com/wp-content/uploads/2017/11/Bootstrap-Carousel-Full-Screen.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item  inner_carousel">
              <img
                className="d-block w-100"
                src="https://onaircode.com/wp-content/uploads/2017/11/Bootstrap-Carousel-Full-Screen.jpg"
                alt="First slide"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="homepage">
        {/* */}
        <div className=" container-fluid">
          <div className="row add_pet_box" ref={ref}>
            <div className="col-4 m-auto">
              <div className="add_pet_detail m-auto ">
                <p className="text-center m-auto">Add pet details</p>
              </div>
            </div>

            <div className="col-4 me-auto  ">
              <motion.div
                className="petAdd_img ms-auto"
                animate={animationreverse}
              >
                <img className="" src="../assests/dog2.png" alt="" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
