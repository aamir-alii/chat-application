import { useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const submitHandler = async () => {
    console.log("called!");
    const data = {
      email: email,
      pass: pass,
    };
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch("http://localhost:5000/api/login", options);
    console.log(res);
    console.log(Cookies.get("token"));
    console.log(props.login);
    if (Cookies.get("token")) {
      props.setLogin(true);
      socket.emit("send-jwt", Cookies.get("token"));
    }
  };
  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign In</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-900 focus:outline-none my-1"
              onClick={submitHandler}
            >
              Login
            </button>
            <div className="text-grey-dark mt-6">
              Don't have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="../signup/"
              >
                Signup
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
