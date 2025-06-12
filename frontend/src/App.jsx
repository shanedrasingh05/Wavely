import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
// import Toggle from "./components/Toggle"
import { Provider } from "react-redux";
import appStore from "./utils/AppStore";


function App() { 
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
