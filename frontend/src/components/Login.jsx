import React, { useState } from "react";
import axios from "axios"

const Login = () => {
  const [emailId, setEmailId] = useState("shanu@gmail.com");
  const [password, setPassword] = useState("shanu@123");

  const handleLogin = async() => {
    
    try{

      const res = await axios.post("http://localhost:3001/login",{
          emailId,
          password,
      },{withCredentials: true})

    }
    catch(err){
        console.error(err)
    }

  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">♥️ Login ♥️</h2>
          <div>
            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email" 
                value={emailId}
                placeholder="Enter your email"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs py-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text" 
                placeholder="Enter your password"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";

// const Login = () => {
//    const [emailId, setEmailId] = useState("")
//    const [password, setPassword] = useState("");

//   return (
//     <div className="flex justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-sm">
//         <div className="card-body">
//           <h2 className="card-title justify-center"> ♥️Login♥️</h2>
//           <div>
//             <label className="form-control w-full max-w-xs py-4">
//               <div className="label">
//                 <span className="label-text">Email ID</span>
//               </div>

//               <input
//                 type="text"
//                 value={emailId}
//                 placeholder=""
//                 className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setEmailId(e.target.value)}
//               />
//             </label>
//             <label className="form-control w-full max-w-xs py-4">
//               <div className="label">
//                 <span className="label-text ">Password</span>
//               </div>

//               <input
//                 type="text"
//                 value={password}
//                 placeholder=""
//                 className="input input-bordered w-full max-w-xs"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>
//           </div>
//           <div className="card-actions justify-center m-2">
//             <button className="btn btn-primary">Login</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
