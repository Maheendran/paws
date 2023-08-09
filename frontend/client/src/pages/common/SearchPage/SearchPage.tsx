import React, { useEffect, useState } from 'react'
import './SearchPage.css'

import { GoLocation } from 'react-icons/go';
import { AiFillShop } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchPlace, getNerestService } from '../../../Redux/Slice/ServiceSlice';

const SearchPage = () => {
    const dispatch=useAppDispatch()
    const params=useParams()
    useEffect(()=>{
const value =params.type
    dispatch(getNerestService(value))
    },[params])

  const {serviceList}=useAppSelector((state)=>state.service)
console.log(serviceList,"serviceList============")
// seacrch section

const [searchValue,setSearchValue]=useState('')

const handleSearch=()=>{
    const servicetype =params.type
 dispatch(SearchPlace({ searchValue: searchValue, servicetype: servicetype }));
}

const navigate=useNavigate()

const handleNavigate=(id:string)=>{
   if(params.type==="clinic"){
    navigate(`/clinic-detail/${params.type}/${id}`)
   }else if(params.type==="grooming"){

    navigate(`/grooming-detail/${params.type}/${id}`)
   }
    
}

  return (
    <>
    
    <div className="container">
        <div className="row mt-5 ">
            <div className="col-5 m-auto">
                <div className="row search_box">

                <input type="text" className='form-control search_input ' 
                 onChange={(e)=>setSearchValue(e.target.value)}  placeholder='Search place...!'/> 

                <button className='btn btn-success ' onClick={handleSearch}>Search</button>

                 </div>
                
            </div>
        </div>
    </div>
    

<div className="container">
    <h3> <span> {serviceList.length}</span> Matching results..</h3>

<div className="row">
{serviceList.map((e)=>(

    <div className="col-4 me-auto place_card" key={e._id} onClick={()=>handleNavigate(e._id)}>
    <div className="row">
<div className="col-5 m-auto place_card_img">
    {e.profileImage? <img src={e.profileImage }alt="" />:
    <img className='img-fluid' src="https://th.bing.com/th/id/OIP.LKX8we1Qg7zNUGyQE5uyMQHaE6?pid=ImgDet&rs=1" alt="" />}
</div>

<div className="col-6 ">
    <p>{e.clinicName}</p>
    <p> <span> <GoLocation color='black' size={'1.3rem'}/> </span>{e?.address[0]?.city}</p>
    <p> <span> <AiFillShop color='black' size={'1.3rem'}/> </span> Open 10AM</p>

</div>


    </div>

</div>
))}


    </div>


</div>

    </>
  )
}

export default SearchPage