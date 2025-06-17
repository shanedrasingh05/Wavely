



import  axios  from "axios";
import { useSelector,useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  // console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;

    try{
      const res = await axios.get(BASE_URL+ "/feed", {withCredentials: true});
      dispatch(addFeed(res.data));
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
    

  return (
    <div style={{ padding: "1rem", fontSize: "1.5rem" }}>Feed Component</div>
  );
};

export default Feed
