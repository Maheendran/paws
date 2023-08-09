import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store';
import { getclinicDetail } from '../../../Redux/Slice/ServiceSlice';

const GroomingDetail = () => {
  const params = useParams<{ service?: string;id?: string }>();
  const {serviceDetail}=useAppSelector((state)=>state.service)


const dispatch=useAppDispatch()

    useEffect(()=>{
      const service = params.service || '';
      const clinicId = params.id || '';
dispatch(getclinicDetail({service,clinicId}))

    },[])
    console.log(serviceDetail,'=====serviceDetail=====')
  
  return (
    <div>GroomingDetail</div>
  )
}

export default GroomingDetail