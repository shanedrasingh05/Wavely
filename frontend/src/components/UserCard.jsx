import React from "react";


const UserCard = ({ user }) => {

    

    const defaultAvatar =
      user?.gender === "female"
        ? "/images/female_avatar.png"
        : "/images/male_avatar.png";


  return (
    <div className="card bg-base-100 w-96 shadow-sm ">
      <figure>
        <img src={user?.profilePic || defaultAvatar} alt="User" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.name || "Card Title"}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts.
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

