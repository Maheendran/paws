import React from "react";
import "../../styles/Menu.css";
import Menu from "../../components/Menu/Menu";
import Widget from "../../components/Widget/Widget";
import { useAppDispatch, useAppSelector } from "../../Redux/Store";

const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Menu />
          </div>
          <div className="col-8">
            <div className="row mt-4">
              <div className="col-3 m-auto">
                <Widget />
              </div>
              <div className="col-3 m-auto">
                <Widget />
              </div>
              <div className="col-3 m-auto">
                <Widget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
