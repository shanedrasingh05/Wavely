import React from 'react'
import { useSelector } from 'react-redux';
import Toggle from './Toggle.jsx';
const NavBar = () => {
 
  const user = useSelector(store => store.user)
  console.log(user)


  return (
    <div className="navbar bg-base-300 ">
      <div className="flex-1">
        <a className="font-bold text-xl mx-2">Wavely</a>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-1 flex font-bold">
            <p className='px-2'>Welcome, {user.firstName} </p>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
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
