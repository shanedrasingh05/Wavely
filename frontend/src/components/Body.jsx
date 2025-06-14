import React, { use } from 'react';
import Navbar from "./NavBar"
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axois from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  const fetchUser = async () =>{

    if(userData){
      return;
    }

    try{

      const res = await axois.get(BASE_URL + "/profile/view",{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
        

    }catch(err){
      if(err.status === 401){
        alert("Please login");
      navigate("/login");
      }
      console.log(err);
    }
  }

  useEffect(()=>{
    
      fetchUser();
   
  },[])


  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Body
