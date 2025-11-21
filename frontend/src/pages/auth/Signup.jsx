import React from "react";
import { useNavigate } from "react-router-dom";
import XSvg from "../../components/svgs/X";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Signup = () => {
  const { fetchSignUp } = useContext(AuthContext);
  const [signupInput, setSignupInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPasswor: "",
  });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    setSignupInput({ ...signupInput, [name]: e.target.value });
  };

  const handleSignUp = async () => {
    const data = await fetchSignUp(signupInput);
    if (!data.error) {
      setSignupInput({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPasswor: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="min-w-3xl flex items-center justify-between mx-auto">
        <XSvg className="lg:w-2/6 fill-white" />
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Join today.
          </h1>
          <div className="flex flex-col gap-3">
            <input
              onChange={handleInput}
              value={signupInput.email}
              name="email"
              type="text"
              placeholder="Email"
              className="w-full border border-gray-700 text-sm text-gray-400  px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none "
            />
            <div className="w-full flex items-center justify-between gap-2">
              <input
                onChange={handleInput}
                value={signupInput.username}
                name="username"
                type="text"
                placeholder="Username"
                className="w-full border border-gray-700 text-sm text-gray-400  px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none "
              />
              <input
                onChange={handleInput}
                value={signupInput.fullname}
                name="fullname"
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-700 text-sm text-gray-400  px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none "
              />
            </div>
            <div className="w-full flex items-center justify-between gap-2">
              <input
                onChange={handleInput}
                value={signupInput.password}
                name="password"
                type="password"
                placeholder="Password"
                className="w-full border border-gray-700 text-sm text-gray-400  px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none "
              />
              <input
                onChange={handleInput}
                value={signupInput.confirmPasswor}
                name="confirmPasswor"
                type="password"
                placeholder="Confirm Password"
                className="w-full border border-gray-700 text-sm text-gray-400 px-3 py-2 rounded-md bg-gray-800 placeholder:text-gray-400 outline-none placeholder:text-xs"
              />
            </div>
            <button
              onClick={handleSignUp}
              className="w-full rounded-full bg-blue-600 text-white text-sm font-medium py-3 cursor-pointer transition-all duration-300 hover:bg-blue-700"
            >
              Signup
            </button>
            <p className="text-gray-300/90 text-base">
              Already have an account?
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full border border-blue-500/90 rounded-full bg-gray-800 text-white text-sm font-medium py-3 cursor-pointer"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
