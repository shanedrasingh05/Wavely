import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Toggle from './Toggle.jsx';
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constant.js';
import axios from 'axios';
import { removeUser } from '../utils/userSlice.js';

const NavBar = () => {
 
  const user = useSelector((store) => store.user)
  // console.log(user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
  
      dispatch(removeUser());
      return navigate("/login");

    } catch (err) {
      console.log(err);
     
    }
  };
  


  return (
    <div className="navbar bg-base-300 sticky top-0 z-50 ">
      <div className="flex-1">
        <Link to="/" className="font-bold text-xl mx-2">
          Wavely
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-1 flex font-bold">
            <p className="px-2">Welcome, {user.firstName} </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt=" user photo" src={user.profileUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
        <Toggle />
      </div>
    </div>
  );
}

export default NavBar
