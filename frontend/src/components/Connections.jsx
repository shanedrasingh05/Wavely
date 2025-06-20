import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const connections  = useSelector((store) => store.connections?.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      console.log("data ", res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections == null) return;

  if (connections.length === 0) return <h1 className="flex justify-center font-bold my-6">No Connection Found!</h1>;
  console.log("conn ", connections);

  return (
    <div className="text-center my-6">
      <h1 className="text-black font-bold text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, profileUrl, age, gender, about } =
          connection;

        return (
          <div key={firstName} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto">
            <div>
              <img src={profileUrl} alt="photo" className="w-20 h-20 rounded-full" />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>

              { age && gender &&<p>{age + ", " + gender}</p>}
              
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
