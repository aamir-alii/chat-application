import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Chat from "./components/Chat";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const PageRoutes = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (Cookies.get("token")) setLogin(true);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={login ? <Chat /> : <Navigate replace to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={
              login ? (
                <Navigate replace to="/chat" />
              ) : (
                <Login login={login} setLogin={setLogin} />
              )
            }
          />
          <Route
            path="chat"
            element={login ? <Chat /> : <Navigate replace to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default PageRoutes;
