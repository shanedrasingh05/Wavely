

import React from "react";

const UserCard = ({ user }) => {

  const { firstName, lastName, profileUrl, age, gender, about } = user;

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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

