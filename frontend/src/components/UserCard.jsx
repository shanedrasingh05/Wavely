

import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import  { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

  const {_id, firstName, lastName, profileUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) =>{
    try{

      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true,
      });

      dispatch(removeUserFromFeed(userId));

    }catch(err){
      console.log(err)
    }
  }





  //   const defaultAvatar = gender?.toLowerCase() === "female"
  // ? "/images/Female_avatar.png"
  // : "/images/Male_avatar.png";

  return (
    <div className="card bg-base-300 w-96 shadow-sm ">
      <figure>
        <img src={user?.profileUrl} alt="c" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-2">
          <button
            className="btn btn-primary rounded-full"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            &#x2196; Left
          </button>
          <button
            className="btn btn-secondary rounded-full"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Right &#x1F498;
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

