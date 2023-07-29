import React from "react";
import "./Widget.css";
const Widget: React.FC = () => {
  const amount = 100;
  const diff = 20;
  return (
    <>
      <div className="widget">
        <div className="left">
          <span className="title">{"data.title"}</span>
          <span className="counter">
            {/* {data.isMoney && "$"}  */}
            {amount}
          </span>
          <span className="link">{"data.link"}</span>
        </div>
        <div className="right">
          <div className="percentage positive">
            {/* <KeyboardArrowUpIcon /> */}
            {diff} %
          </div>
          {"data.icon"}
        </div>
      </div>
    </>
  );
};

export default Widget;
