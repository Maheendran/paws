import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import DataTable from "../../components/DataTable/DataTable";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";
import {
  AccountBlock,
  getAllClinic,
  getAllGroomings,
  getAllPetOwner,
} from "../../Redux/Slice/UserSlice";
import "./Account.css";
import { toast, Toaster } from "react-hot-toast";
const Accounts = () => {
  const dispatch = useAppDispatch();
  const { petOwnerList, loading, groomingList, clinicList } = useAppSelector(
    (state) => state.user
  );

  const [userList, setUserList] = useState(petOwnerList);
  const [accounttype, setAccounttype] = useState("PetOwner");
  const [blocked, setBlocked] = useState("");

  useEffect(() => {
    dispatch(getAllPetOwner()).then((data) => {
      setUserList(data.payload.usersList);
    });

    dispatch(getAllClinic());
    console.log("middle");
    dispatch(getAllGroomings());
  }, [blocked]);

  const handleAccount = (data: string) => {
    setAccounttype(data);
    if (data === "PetOwner") {
      setUserList(petOwnerList);
      setCurrentPage(1);
      setBlocked("");
    } else if (data === "Grooming") {
      setUserList(groomingList);
      setCurrentPage(1);
      setBlocked("");
    } else {
      setUserList(clinicList);
      setCurrentPage(1);
      setBlocked("");
    }
  };

  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(userList.length / itemsPerPage);

  const displayData = userList.filter((item, index: any) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });

  const handleBlocked = (id: string, accountType: string, blocked: boolean) => {
    console.log(id, accountType, blocked);
    const data = {
      id,
      accountType,
      blocked,
    };

    dispatch(AccountBlock(data)).then((data) => {
      console.log(data.payload?.account);

      if (data.payload?.account.blocked) {
        toast.success("Blocked");
        setBlocked("upaed");
      } else {
        toast.success("Unblocked");
        setBlocked("upaedted");
      }
    });
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      {loading && <p>Loding</p>}
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-9 ">
            <div className="row ">
              <div className="col-3 mx-auto   text-center">
                <button
                  onClick={() => handleAccount("PetOwner")}
                  className={
                    accounttype === "PetOwner" ? "active_heading" : "heading"
                  }
                >
                  PetOwners
                </button>
              </div>
              <div className="col-3 mx-auto text-center">
                <button
                  onClick={() => handleAccount("Grooming")}
                  className={
                    accounttype === "Grooming" ? "active_heading" : "heading"
                  }
                >
                  Grooming
                </button>
              </div>
              <div className="col-3 mx-auto text-center">
                <button
                  onClick={() => handleAccount("Clinic")}
                  className={
                    accounttype === "Clinic" ? "active_heading" : "heading"
                  }
                >
                  Clinic
                </button>
              </div>
            </div>

            <div className="row m-auto text-center">
              <DataTable dataList={displayData} handleBlocked={handleBlocked} />
            </div>
            <div className="row ">
              <div className="col-2 d-flex m-auto text-center mt-5">
                <button
                  className="btn btn-dark"
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                >
                  -
                </button>
                <p className="mx-1">{currentPage}</p>
                <button
                  className="btn btn-dark"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
