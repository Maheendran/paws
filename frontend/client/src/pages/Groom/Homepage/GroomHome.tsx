import React from "react";
import './GroomHome.css'
const GroomHome:React.FC = () => {
  return (
    <>
      <h1 className="text-center">Bookings</h1>
<div className="container">

  <div className="row service_main">
    <div className="col-3 service_card mx-2">
      <div className="service_pic">
        <img className="img-fluid" src="https://s-media-cache-ak0.pinimg.com/736x/b2/aa/92/b2aa92fdf70fed036b20f94257be9e4a--grooming-salon-pet-grooming.jpg" alt="" />
      </div>
<div className="row m-auto service_detail">
  <p>Time: 10:00AM</p>
  <p>Owner name:Maheendran</p>
  <p>Number:8610766505</p>
  <p>Package:Spa bath</p>
  <button className="btn btn-warning">Cancel</button>

</div>
    </div>



  </div>
</div>


    </>
  );
};

export default GroomHome;
