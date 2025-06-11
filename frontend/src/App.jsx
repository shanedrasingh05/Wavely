import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
// import Toggle from "./components/Toggle"


function App() { 
  return (
    
    <>

    <BrowserRouter basename="/">

    <Routes>

      <Route path="/" element={<Body/>} >
      <Route path="/" element={<Profile/>} />
      <Route path="/" element={<Login />} />

      </Route>


      

    </Routes>

    </BrowserRouter>




      
      
    </>
  );
}

export default App;
