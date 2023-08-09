import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { LuEdit } from "react-icons/lu";
import {
  Createaddress,
  Updateaddress,
  UpdatecurrentUser,
  Updateprofilepic,
} from "../../../Redux/Slice/UserDetailSlice";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import LoadingComp from "../../../components/loading/LoadingComp";

const Profile: React.FC = () => {
  const avatarStyle = {
    borderTopLeftRadius: '.5rem',
    borderBottomLeftRadius: '.5rem',
  };
  
  const dispatch = useAppDispatch();
  const { currentUser,userAddress,userloading } = useAppSelector((state) => state.user);


  const [showmodal, setShowmodal] = useState("");
  const handelPopup = () => {
    setShowmodal("profile");
  };
  const handelAddressPop=()=>{
    setShowmodal("address");
  }

  const [formValues, setFormValues] = useState({});
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const navigate = useNavigate();
  const handleupdateProfile = (e: any) => {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(formValues).filter(([key, value]) => value !== "")
    );
    dispatch(UpdatecurrentUser(filteredData)).then((data) => {
      if (data.payload.status === "success") {
        setShowmodal("");
        navigate("/userprofile");
        toast.success("profile updated");
      } else {
        toast.error(data.payload.message);
      }
    });
  };
// update address
const handleupdateAddress = (e: any) => {
  e.preventDefault();
  const filteredData = Object.fromEntries(
    Object.entries(formValues).filter(([key, value]) => value !== "")
  );
if(userAddress.adressLine){
  filteredData._id=userAddress._id
  dispatch(Updateaddress(filteredData)).then((data) => {
    if (data.payload.status === "success") {
      setShowmodal("");
      navigate("/userprofile");
      toast.success("Address updated");
    } else {
      toast.error(data.payload.message);
    }
  });
}
else{

  const newAddres={...filteredData,
    userId:currentUser._id,mobile:currentUser.mobile,
  name:currentUser.username||currentUser.ownerName,
  is_default:true
  }
    dispatch(Createaddress(newAddres)).then((data) => {
      if (data.payload.status === "success") {
        setShowmodal("");
        navigate("/userprofile");
        toast.success("Address created");
      } else {
        toast.error(data.payload.message);
      }
    });
}

};

// add profile pic
const fileInputRef:any=useRef()

const [profileImage,setProfileImage]=useState<String | ArrayBuffer | null>('')

const handleprofilepopup=()=>{
  fileInputRef.current.click()
}

const handleFileChange = (e:any) => {
  const { files } = e.target;
  const file = files[0];
  previewFile(file);
};

function previewFile(file:any) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const result = reader.result;
      setProfileImage(result);
      handleCall(result);
  };


}

const handleCall=(result: string | ArrayBuffer | null)=>{
  const data={
    image:result
  }
  dispatch(Updateprofilepic(data)).then((data)=>{
    if(data.payload.status){
      toast.success('Profile picture updated')
    }
  })
}

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
{userloading && <LoadingComp/>}
      <section className="vh-70 " >
      <div className="container-fluid  h-70">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-12 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: '.5rem',position:"relative" }}>
              <div className="row g-0">
                <div className="col-md-3 gradient-custom text-center text-white " style={avatarStyle}>

                  <img src={currentUser.profileImage? currentUser.profileImage: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"}
                    alt="Avatar"
                    className="img-fluid my-5 profile_pic_sec"
                  
                    onClick={handleprofilepopup} />

                 <input  type="file"
                  accept="image/*"
                  style={{ display: 'none'}} ref={fileInputRef}   onChange={handleFileChange}/>
                  {currentUser.accountType==="PetOwner" && <h5>{currentUser.username}</h5>}
                  {currentUser.accountType === "Clinic" || currentUser?.accountType === "Grooming" ? 
                  <h5>{currentUser.ownerName}</h5>:""
                  }
                  <i className="far fa-edit mb-5"></i>
                </div>
                <div className="col-md-6">
                  <div className="card-body p-4 ">
                    <h6>Profile card</h6>
                    <div className="col-1 ms-auto" onClick={handelPopup}>
            <LuEdit size={"1.3rem"}  />
          </div>
           
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">

                    {currentUser.accountType === "Grooming" && (
            <div className="col-6 mb-3">
            <h6>Shop Name </h6>
            <p className="text-muted">{currentUser.shopName? currentUser.shopName:"add shop name"}</p>
          </div>
            )}
                {currentUser.accountType === "Clinic" && (
            <div className="col-6 mb-3">
            <h6>Clinic Name </h6>
            <p className="text-muted">{currentUser.clinicName? currentUser.clinicName:"add clinic name "}</p>
          </div>
            )}
              {currentUser.accountType === "Clinic" || currentUser?.accountType === "Grooming"  ?
            <div className="col-6 mb-3">
            <h6>Owner Name </h6>
            
            <p className="text-muted">{currentUser.ownerName? currentUser.ownerName:"add name "}</p>
          </div>:""
            }
                     <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{currentUser.email}</p>
                      </div>


                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">{currentUser.mobile? currentUser.mobile:"add mobile number "}</p>
                      </div>


                      <div className="col-6 mb-3">
                        <h6>UPI</h6>
                        <p className="text-muted"> {currentUser.upi? currentUser.upi:"add UPI address "}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Wallet</h6>
                        <p className="text-muted"> {currentUser.wallet? currentUser.wallet:0}</p>
                      </div>
                     
                    </div>

                  </div>
                </div>

<div className="col-md-3">
<div className="card-body p-4 ">
                    <h6>Address</h6>
                    {userAddress.adressLine?
                    <div className="ms-auto  col-1 " onClick={handelAddressPop}>
            <LuEdit size={'1.3rem'}  />
          </div>:
           <div className="ms-auto  col-1" onClick={handelAddressPop}>
           <BiMessageSquareAdd size={'1.3rem'}   />
         </div>}
           
                    <hr className="mt-0 mb-4" />
                

                    <div className="row pt-1 address_portion">
         {userAddress.adressLine?
                      <div className="col-12 mb-3">
                        <p className="text-muted">AdressLine: {userAddress.adressLine}</p>
                        <p className="text-muted">City: {userAddress.city}</p>
                        <p className="text-muted">State: {userAddress.state}</p>
                        <p className="text-muted">Pincode: {userAddress.pincode}</p>
                        <p className="text-muted">Country: {userAddress.country}</p>
                      </div>
                   :"Add address"}
                
                    </div>
                    
                  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
{/* ================================ */}
      {showmodal==="profile" &&(
        <div className="profile_modal">
          <div className="modal_form">
            <div className="close_btn">
              <AiFillCloseCircle
                onClick={() => setShowmodal("")}
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
      )   
   }
   
{showmodal==="address" &&(
        <div className="profile_modal">
          <div className="modal_form">
         
            <div className="close_btn">
              <AiFillCloseCircle
                onClick={() => setShowmodal("")}
                size={"1.5rem"}
              />
            </div>
            { userAddress.adressLine?
            <h3 className="text-center mt-2">{"Update address"}</h3>:
            <h3 className="text-center mt-2">{"Create address"}</h3>}
            <form onSubmit={handleupdateAddress}>
      
              <div className="row mt-2">
                <div className="col-12">
                  <label>AdressLine</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder={
                      userAddress.adressLine ? userAddress.adressLine : "add AdressLine"
                    }
                    name="adressLine"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-6">
                  <label>city</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder={userAddress.city ? userAddress.city : "add city"}
                    name="city"
                    onChange={handleInputChange}
                  />
                </div>
           
              
              <div className="col-6">
                  <label>State</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder={userAddress.state ? userAddress.state :"add state"}
                    name="state"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label>Country</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                placeholder={userAddress.country ? userAddress.country :"add country"}
                    name="country"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <label>Pincode</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder={userAddress.pincode ? userAddress.pincode :"add pincode"}
                    name="pincode"
                    onChange={handleInputChange}
                  />
                </div>
                </div>
  

              <div className="row m-auto mt-4">
                <div className="col-4 mx-auto text-center">
               { userAddress.adressLine?
                  <button
                    className=" btn text-dark mt-3 register_btn"
                    type="submit">
                    Update
                  </button>:
                   <button
                   className=" btn text-dark mt-3 register_btn"
                   type="submit">
                   Create
                 </button>
                  }


                </div>
              </div>
            </form>
          </div>
        </div>
      )   
   }
    </>
  );
};

export default Profile;
