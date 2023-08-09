import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../Redux/Store'
import {  BookClinicSlot, cancellingslot, getDoctorTimeslot } from '../../../Redux/Slice/ServiceSlice'
// import { GoLocation } from 'react-icons/go';
// import { AiFillShop } from 'react-icons/ai';
import { toast, Toaster } from "react-hot-toast";
import Swal from 'sweetalert2'
import { GetallDoctors } from '../../../Redux/Slice/DoctorSlice';
// import './Service.css'
const BookingPage = () => {
  const params = useParams<{ service?: string;id?: string }>();
  const {timeslots}=useAppSelector((state)=>state.service)
  const {doctorsList}=useAppSelector((state)=>state.doctor)
  // const user=useAppSelector((state)=>state.user)

console.log(timeslots,"serviceslice")
const dispatch=useAppDispatch()
const [date,setDate]=useState("")
const [time,setTime]=useState("")
const [doctorId,setDoctorId]=useState('')

    useEffect(()=>{

dispatch(GetallDoctors()).then((data)=>{
  console.log(data.payload,"responxe===========")
})
  
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
<div className="container store_date mt-2">

  <div className="row">
    <div className="col-12">
        <h2 className='text-center'>Bookings</h2>
        <hr />
    </div>
<div className="col-3 mx-auto mt-3 ">
   <input className='form-control' type="date" onChange={(e)=>setDate(e.target.value)}  required/>
</div>
  </div>
  <h4 className='text-center mt-5'>Choose doctor</h4>

  <div className="row d-flex justify-content-center">

  {doctorsList.map((data:any)=>(
    <>
    <div className="col-4 " key={data._id}>
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
        const CurrentUser = timeslots[0]?.Bookings.some((slot:any) =>slot.time === time );
        
        return (
          <div className="col-1 m-auto" key={index}>

            <button onClick={() => setTime(time)} disabled={CurrentUser} 
            className={CurrentUser ? "booked" : "unbooked" }>{time}</button>
             {  CurrentUser &&
            <button className='cancel_btn btn btn-danger' onClick={()=>handleCancelBook(time)}>Cancel</button>
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



    </div>

    </>
  )
}

export default BookingPage