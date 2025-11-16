import {  Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar'
import { Base_URl } from '../utils/Constants';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Toaster } from 'react-hot-toast';

const Body= ()=>{
    let dispatch = useDispatch();
    let navigate = useNavigate()
    let user = useSelector((store)=>store.user)
   const fetchProfile = async()=>{
      try{
        let result = await axios.get(Base_URl+"/profile",{
             withCredentials:true
         })
         dispatch(addUser(result.data))
      }catch(err){
        if(err.status === 401 || err.status === 404){
           navigate("/login")
        }
        console.log(err.message)
      }
   }
   
   useEffect(()=>{
        if(!user){
         fetchProfile() 
        }
   },[])

    return(
        <div className=''>
            <NavBar />
            <Outlet />
            <Toaster />
        </div>
    )
}
export default Body;