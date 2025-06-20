import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests , removeRequest} from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  // const [showButtons, setShowButtons] = useState(true);


  const reviewRequest = async(status, _id) => {

    try{

      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
        withCredentials: true,
      });
      
      dispatch(removeRequest(_id));

    }catch(err){
      console.log(err);
    }

  }



  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/requests/received", {
          withCredentials: true,
        });
        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center font-bold my-6">No Requests Found!</h1>;
  console.log("conn ", requests);

  return (
    <div className="text-center my-6">
      <h1 className="text-black font-bold text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, profileUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto"
            // className="flex justify-center items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                src={profileUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>

            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-lg">
                {firstName + " " + lastName}
              </h2>

              {age && gender && <p>{age + ", " + gender}</p>}

              <p>{about}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
