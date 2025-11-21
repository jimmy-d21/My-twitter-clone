import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import XSvg from "../../components/svgs/X";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchLoginUser } = useContext(AuthContext);

  const [loginInput, setLoginInput] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false); // <-- NEW

  const handleInput = (e) => {
    const name = e.target.name;
    setLoginInput({ ...loginInput, [name]: e.target.value });
  };

  const handleLogin = async () => {
    setIsLoading(true); // START LOADING
    await fetchLoginUser(loginInput);

    setIsLoading(false); // STOP LOADING
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-[350px] flex items-center justify-between mx-auto">
        <XSvg className="lg:w-2/5 fill-white" />

        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-white mb-3">Let's go.</h1>

          <div className="flex flex-col gap-3">
            <input
              onChange={handleInput}
              value={loginInput.username}
              name="username"
              type="text"
              placeholder="Username"
              className="w-full border border-gray-700 text-sm text-gray-400 px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none"
            />

            <input
              onChange={handleInput}
              value={loginInput.password}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border border-gray-700 text-sm text-gray-400 px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none"
            />

            <button
              onClick={handleLogin}
              disabled={isLoading} // DISABLE BUTTON
              className={`w-full rounded-full text-white text-sm font-medium py-3 cursor-pointer transition-all duration-300 
              ${
                isLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              `}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            <p className="text-gray-300/90 text-sm text-center mt-2">
              Don't have an account?
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="w-full border border-blue-500/90 rounded-full bg-gray-800 text-white text-xs font-medium py-3 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
