import React, { useState, useEffect, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/home/Home";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import Profile from "./pages/profile/Profile";
import Notification from "./pages/notification/Notification";
import PageNotFound from "./pages/notFound/PageNotFound";
import CommentCard from "./components/CommentCard";
import UpdateProfile from "./components/UpdateProfile";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { authUser, fetchAuthUser } = useContext(AuthContext);
  const [commentDetails, setcommentDetails] = useState(null);
  const [userProfileDetails, setUserProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    await fetchAuthUser();
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800 text-center">
        <h1 className="text-xl text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {commentDetails && (
        <CommentCard
          commentDetails={commentDetails}
          setcommentDetails={setcommentDetails}
        />
      )}
      {userProfileDetails && (
        <UpdateProfile
          userProfileDetails={userProfileDetails}
          setUserProfileDetails={setUserProfileDetails}
        />
      )}
      <div className="h-screen bg-gray-800 flex justify-between px-[250px]">
        {authUser && <Sidebar />}
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                authUser ? (
                  <Home setcommentDetails={setcommentDetails} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={!authUser ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/notifications"
              element={authUser ? <Notification /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile/:username"
              element={
                authUser ? (
                  <Profile
                    setUserProfileDetails={setUserProfileDetails}
                    setcommentDetails={setcommentDetails}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        {authUser && <Rightbar />}
      </div>
    </>
  );
};

export default App;
