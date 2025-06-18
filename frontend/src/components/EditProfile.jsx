import React from 'react'
import { useState } from 'react';
import UserCard  from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constant.js';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
     
      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [profileUrl, setProfileUrl] = useState(user.profileUrl);
      const [age, setAge] = useState(user.age); 
      const [gender, setGender] = useState(user.gender);
      const [about, setAbout] = useState(user.about);
      const [error, setError] = useState("");
      const dispatch = useDispatch();
      const [shawToast, setShawToast] = useState(false);

        const saveProfile = async ()=>{
            // clear error
            setError("");
            try{

                const res = await axios.patch(
                  BASE_URL + "/profile/edit",
                  {
                    firstName,
                    lastName,
                    profileUrl,
                    age,
                    gender,
                    about,
                  },
                  {
                    withCredentials: true,
                  }
                );
                dispatch(addUser(res?.data?.data));
                setShawToast(true);

                 setTimeout(()=>{
                    setShawToast(false);
                }, 3000);
                // console.log(res);


            }catch(err){
                setError(err.response.data);

            }
        }

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <div className="flex justify-center items-center h-18">
                {/* <img
                src={user.profileUrl}
                alt="Edi"
                className="w-20 h-20 rounded-full mx-auto"
              /> */}
                <img
                  src="/images/edit.png"
                  alt="Edit Icon"
                  className="w-20 h-20"
                />
              </div>

              <h2 className="card-title justify-center font-bold">
                Edit Profile
              </h2>
              <div>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="name"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="name"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    type="text"
                    value={profileUrl}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setProfileUrl(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="test"
                    value={age}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                
                </label>

                <label className="form-control w-full max-w-xs py-4">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full max-w-xs"
                    placeholder="Bio"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <p className="text-red-500j">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard
          user={{
            firstName,
            lastName,
            profileUrl,
            age,
            gender,
            about,
          }}
        />
      </div>

      {shawToast && (
        <div className="toast toast-middle">
          <div className="alert alert-success ">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile
