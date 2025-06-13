import React from 'react';
import Navbar from "./NavBar"
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import axois from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {

  const dispatch = useDispatch();

  const fetchUser = async () =>{
    try{

      const res = await axois.get(BASE_URL + "/profile/view",{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
        

    }catch(err){
      console.log(err);
    }
  }


  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Body
