import React, { useState } from "react";
import { Route, Routes, Redirect, BrowserRouter } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";

import { Context } from "./Utils/Context";
import IsAuthentecated from "./Utils/IsAuthentecated";
//eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlOWI4ODBmODE4MmRkYTU1N2Y3YzcwZTIwZTRlMzcwZTNkMTI3NDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmFjZS1kZXRlY3Rpb24tZDA3YTAiLCJhdWQiOiJmYWNlLWRldGVjdGlvbi1kMDdhMCIsImF1dGhfdGltZSI6MTY3MzE1NzEzOSwidXNlcl9pZCI6InAxZGRXbVV5Rk9jcDEwQVVJS0x2enRROWhDRTMiLCJzdWIiOiJwMWRkV21VeUZPY3AxMEFVSUtMdnp0UTloQ0UzIiwiaWF0IjoxNjczMTU3MTM5LCJleHAiOjE2NzMxNjA3MzksImVtYWlsIjoiYS5zQHNhbS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYS5zQHNhbS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OY36SLAxgIlpLkRcVoh45zpeQDaOCljPDle7kcp1Us86w1SGEiDbw4IUbdqCcd-bl54jeqS6hLWLtfj6smYq_kuDD3Q8kFsuH_6C_tZIvxl5wlLZc21EtAjDZHcCJku4xl99jXzV9le38HzbvUdv8z5xjU6z5ZuM8eRhU7ji9n9O-RYnFo_1JQZWXbz-Y6FXGxBTbEMx8EbVD_OLVTqm_9hsyGVF6p6DcfJutfi2yfkmvGJ99sNNlUZJtZ_mfnc7xTPPIDpCR2cKVtBXivFMEGS25bd7eWh2b3-JQaD6W0nPJyuuJD1kLy3oHAr5t_thh8FYZUjsQWcuePqZXAPPWQ
function App() {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const auth = {
    user: "",
    token: token,
    login: (token) => {
      setToken(token);
      localStorage.setItem("token", token);
    },
    logout: () => {
      setToken(null);
      localStorage.removeItem("token");
    },
  };

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={auth}>
          <NavBar />
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route
              path="/profile"
              element={
                <IsAuthentecated>
                  <Profile />
                </IsAuthentecated>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
