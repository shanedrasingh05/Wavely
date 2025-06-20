import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
// import Toggle from "./components/Toggle"
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./components/Feed";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";


function App() { 
  return (
    <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
