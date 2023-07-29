import React, { useEffect, useState } from "react";
import "./Profile.css";
import NavbarPet from "../../petOwner/Navbar/NavbarPet";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import {
  UpdatecurrentUser,
  getcurrentUser,
} from "../../../Redux/Slice/UserDetailSlice";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getcurrentUser());
  }, []);

  const [showmodal, setShowmodal] = useState(false);
  const handelPopup = () => {
    setShowmodal(!showmodal);
  };
  const [formValues, setFormValues] = useState({});

  const navigate = useNavigate();
  const handleupdateProfile = (e: any) => {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(formValues).filter(([key, value]) => value !== "")
    );
    dispatch(UpdatecurrentUser(filteredData)).then((data) => {
      if (data.payload.status === "success") {
        setShowmodal(!showmodal);
        navigate("/userprofile");
        toast.success("profile updated");
      } else {
        toast.error(data.payload.message);
      }
    });
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  return (
    <>
      <NavbarPet />
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="container-fluid profile_banner">
        <div className="paws">
          <img src="../assests/orange.png" alt="" />
        </div>

        <div className="row">
          <div className="col-5">
            <div className="profile_image mx-auto mt-4">
              <img
                src="https://media.istockphoto.com/id/1317523051/photo/young-woman-takes-selfie-with-her-dog.jpg?s=170667a&w=0&k=20&c=7PHL5vXfil18oI1Mp3rMYX-hvW3IQ8ABf1NzBc-Y1zw="
                alt=""
              />
            </div>
          </div>
          <div className="col-4  m-auto">
            <ProfileForm handelPopup={handelPopup} currentUser={currentUser} />
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-5  me-auto ">
            <div className="wallet_card ms-auto">
              <div className="row  ">
                <h4 className="text-center mt-2">Wallet balance</h4>
              </div>
              <div className="row ">
                <span className="text-center">
                  <FaRupeeSign size={"1.4rem"} /> <h5>101001</h5>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-5 me-auto  debit_box_parent">
            <div className="debit_box mx-auto">
              <img
                className="rupee_icon mx-1"
                src="https://cdn-icons-png.flaticon.com/512/2386/2386759.png"
                alt=""
              />
              <input type="text" placeholder="Amount....." />

              <button className="debit_btn">Debit</button>
            </div>
            <p
              className="mt-2 text-center"
              style={{ fontSize: "0.7rem", color: "red" }}
            >
              *The minimum withdrawal amount is 200 rupees.
            </p>
          </div>
        </div>
      </div>

      {showmodal && (
        <div className="profile_modal">
          <div className="modal_form">
            <div className="close_btn">
              <AiFillCloseCircle
                onClick={() => setShowmodal(!showmodal)}
                size={"1.5rem"}
              />
            </div>
            <h3 className="text-center mt-2">{"Update Profile"}</h3>
            <form onSubmit={handleupdateProfile}>
              <div className="row mt-2">
                {currentUser.accountType === "Grooming" && (
                  <div className="col-6">
                    <label>Shope name</label>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder={
                        currentUser.shopName
                          ? currentUser.shopName
                          : "Shop name"
                      }
                      name="shopName"
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {currentUser.accountType === "Clinic" && (
                  <div className="col-6">
                    <label>Clinic name</label>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder={
                        currentUser.clinicName
                          ? currentUser.clinicName
                          : "Clinic name"
                      }
                      name="clinicName"
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {currentUser.accountType === "Clinic" ||
                currentUser.accountType === "Grooming" ? (
                  <div className="col-6">
                    <label>Owner name</label>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder={
                        currentUser.ownerName
                          ? currentUser.ownerName
                          : "Owner name"
                      }
                      name="ownerName"
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/*  */}
              {currentUser.accountType === "PetOwner" && (
                <div className="col-12">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder={
                      currentUser.username ? currentUser.username : "username"
                    }
                    name="username"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {currentUser.createdBy === "manual" && (
                <div className="col-12 ">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control mt-3"
                    placeholder={
                      currentUser.email ? currentUser.email : "email"
                    }
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="row mt-2">
                <div className="col-6">
                  <label>Mobile</label>
                  <input
                    type="number"
                    className="form-control mt-3"
                    placeholder={
                      currentUser.mobile ? currentUser.mobile : "mobile"
                    }
                    name="mobile"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-6">
                  <label>UPI</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder={currentUser.upi ? currentUser.upi : "UPI"}
                    name="upi"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row m-auto mt-4">
                <div className="col-4 mx-auto text-center">
                  <button
                    className=" btn text-dark mt-3 register_btn"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
