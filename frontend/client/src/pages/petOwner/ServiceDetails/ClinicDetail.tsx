import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../Redux/Store'
import {  BookClinicSlot, cancellingslot, getDoctorTimeslot, getclinicDetail } from '../../../Redux/Slice/ServiceSlice'
import './Service.css'
import { GoLocation } from 'react-icons/go';
import { AiFillShop } from 'react-icons/ai';
import { toast, Toaster } from "react-hot-toast";
import Swal from 'sweetalert2'
const ClinicDetail = () => {
  const params = useParams<{ service?: string;id?: string }>();
  const {serviceDetail,timeslots}=useAppSelector((state)=>state.service)
  const user=useAppSelector((state)=>state.user)

const dispatch=useAppDispatch()
const [date,setDate]=useState("")
const [time,setTime]=useState("")
const [doctorId,setDoctorId]=useState('')

    useEffect(()=>{
      const service = params.service || '';
      const clinicId = params.id || '';
dispatch(getclinicDetail({service,clinicId}))
    },[])
const handleDoctorTime=(doctorId:string)=>{
setDoctorId(doctorId)
const clinicId=params.id
if(date===""){
  const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const standardDateFormat = `${year}-${month}-${day}`;
setDate(standardDateFormat)
}
const formdata={
  date,clinicId,doctorId
}

dispatch(getDoctorTimeslot(formdata))
}

//============== handle booking======================
const handlebooking=()=>{

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    html: `
    <p>Date ${date}</p>
    <p>Time ${time}</p>
  `, 
  confirmButtonText: 'Yes, confirm',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
   
  }).then((result) => {
    if (result.isConfirmed) {
  const clinicId=params.id
  const formdata={
    date,clinicId,doctorId,time
  }
  dispatch(BookClinicSlot(formdata)).then((data)=>{
    const formdata={
      date,clinicId,doctorId
    }
    dispatch(getDoctorTimeslot(formdata)).then((data)=>{
      setTime("")
      Swal.fire(
        'Slot Booked!',
        'Your time slot has been booked.',
        'success'
      )
    })
  })
    }
  })


      }
      const allTimes = [
        "10:00AM", "11:00AM", "12:00PM",
        "01:00PM", "02:00PM", "03:00PM",
        "04:00PM", "05:00PM"
      ];
// cancel booking
const handleCancelBook=(time:string)=>{
  Swal.fire({
    title: 'Booking cancel?',
    icon: 'warning',
    html: `
    <p>Date ${date}</p>
    <p>Time ${time}</p>
  `,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

 const clinicId=params.id

  const formdata={
    date,clinicId,doctorId,time
  }
  
  dispatch(cancellingslot(formdata)).then((data)=>{
if(data.payload.status==="success"){
  const clinicId=params.id
toast.success(data.payload.message)
const formdata={
  date,clinicId,doctorId
}
dispatch(getDoctorTimeslot(formdata)).then((data)=>{
  Swal.fire(
    'Cancelled!',
    'Booking cancelled',
    'success'
  )})}
}) }
  })
}

  return (
    <>
       <Toaster toastOptions={{ duration: 3000 }} />
<div className="container-fluid ">
  <div className="row mt-3">
    <div className="col-8 store_card m-auto">
      <div className="row">
        <div className="col-4 store_profile_box">
          <img className='img-fluid' src={serviceDetail[0]?.profileImage} alt="" />
        </div>
        <div className="col-5 m-auto">
          <h3>{serviceDetail[0]?.clinicName}</h3>
          <p> <span> <GoLocation color='black' size={'1.3rem'}/> </span>{serviceDetail[0]?.address[0]?.city}</p>
          <p> <span> <AiFillShop color='black' size={'1.3rem'}/> </span> Open 10AM</p>
        </div>
      </div>
    
    </div>
  </div>
  {/* choose doctor */}
<div className="container store_date mt-2">

  <div className="row">
    <div className="col-12">
        <h2 className='text-center'>Book a slot</h2>
        <hr />
    </div>


<div className="col-3 mx-auto mt-3 ">
   <input className='form-control' type="date" onChange={(e)=>setDate(e.target.value)}  required/>
</div>

  </div>
  <h4 className='text-center mt-5'>Choose doctor</h4>

  <div className="row d-flex justify-content-center">

  {serviceDetail[0]?.doctorlist.map((data:any)=>(
    <>
    <div className="col-4 ">
       <div 
       className={` mx-auto text-center doctor_pic ${doctorId === data._id ? 'selected-doctor' : ''}`}
       
       onClick={()=>handleDoctorTime(data._id)}>
      <img src="https://www.pngitem.com/pimgs/m/198-1985222_avatar-doctor-png-transparent-png.png" alt="" />
</div>  
<div className="col-12 text-center">
  <p>{data.name}</p>
  <p> Experience: {data.experience}</p>
  </div>
    </div>
    </>

))}

  </div>
  {/* =======================choose date==========================*/}

{doctorId && date  &&
  <div className="row  mt-4">
    <div className="col-8 mx-auto text-center ">
  
  <div className="container mt-4  text-center">

<div className="row">
{allTimes.map((time, index) => {

        const isCurrentUser = timeslots[0]?.Bookings.some((slot:any) => slot.time === time && slot.user_id === user.currentUser._id);
        const isnotCurrentUser = timeslots[0]?.Bookings.some((slot:any) =>slot.time === time );
        
        return (
          <div className="col-1 m-auto" key={index}>

            <button onClick={() => setTime(time)} disabled={isnotCurrentUser} 
            className={isnotCurrentUser ? "booked" : "unbooked" }>{time}</button>
             {  isCurrentUser &&
            <button className='cancel_btn btn btn-danger'  onClick={()=>handleCancelBook(time)}>Cancel</button>
             }
          </div>
        );
      })}
    </div>



</div>


{doctorId && date  && time &&

      <div className="col-3 mx-auto mt-4">
        <button className='btn booking_btn' onClick={handlebooking}>Book</button>
      </div>
}
    </div>
  </div>
    }
</div>

  {/* contact us */}
  <div className="row store_card mt-4">
    <div className="col-6 mx-auto text-center">
    
<div className="row m-4">
    <h3>Fore more details</h3>
</div>
<div className="row">
   <div className="col-6 text-start">

    <p>Contact number :  <span className='text-muted'>{serviceDetail[0]?.address[0]?.mobile}</span> </p>
    <p>Address: <span className='text-muted'>{serviceDetail[0]?.address[0]?.adressLine}</span> </p>
    <p>City: <span className='text-muted'>{serviceDetail[0]?.address[0]?.city}</span> </p>
    <p>Country: <span className='text-muted'>{serviceDetail[0]?.address[0]?.country}</span> </p>
    <p>Pincode: <span className='text-muted'>{serviceDetail[0]?.address[0]?.pincode}</span> </p>
   </div>
   <div className="col-4 ms-auto">
<img className='img-fluid' src="https://www.millcreekvet.ca/wp-content/uploads/2021/07/doktorka.png" alt="" />
   </div>
</div>
  
    </div>
  </div>
</div>

    </>
  )
}

export default ClinicDetail


