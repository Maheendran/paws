import React, { useState } from "react";
import "./Verification.css";

const Verification: React.FC = () => {
  const [formdata, setFormdata] = useState({
    "id-proof": null,
    agreement: null,
  });

  const handleChangeformdata = (event: any) => {
    const { name, files } = event.target;
    const selectedFile = files[0];
    setFormdata((prevValues) => ({ ...prevValues, [name]: selectedFile }));
  };
  return (
    <>
      <div className="chooseprofile_main container-fluid">
        <div className="logo">
          <img src="../assests/logo.png" alt="" />
        </div>

        <h1 className="text-center mt-4">Verification !</h1>

        <div className="verification_main">
          <div className="row">
            <div className="col-5 m-auto">
              <div className="verification_card m-auto">
                <h3>Account verification</h3>
                <div className="row">
                  <form>
                    <label
                      className="text-start"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Id-proof (Aadhar,Driving licensce){" "}
                    </label>
                    <input
                      onChange={handleChangeformdata}
                      type="file"
                      className="form-control"
                      placeholder="Id-proof"
                      name="id-proof"
                    />
                    <label
                      className="text-start mt-3"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Id-proof (Aadhar,Driving licensce){" "}
                    </label>
                    <input
                      onChange={handleChangeformdata}
                      type="file"
                      className="form-control"
                      placeholder="Id-proof"
                      name="agreement"
                    />
                    <div className="col-3 mx-auto">
                      <button className="mt-3 btn" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-5 ms-auto">
              <img
                className="img-fluid "
                src="../assests/dog_verifi.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
