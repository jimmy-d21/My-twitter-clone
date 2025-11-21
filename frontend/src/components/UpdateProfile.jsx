import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const UpdateProfile = ({ userProfileDetails, setUserProfileDetails }) => {
  const { fetchUpdateUserProfile } = useContext(UserContext);

  const [isUpdating, setUpdating] = useState(false);
  const [updateProfile, setUpdateProfile] = useState({
    username: userProfileDetails?.username || "",
    fullname: userProfileDetails?.fullname || "",
    email: userProfileDetails?.email || "",
    bio: userProfileDetails?.bio || "",
    links: userProfileDetails?.links || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateInput = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const result = await fetchUpdateUserProfile(
        updateProfile,
        userProfileDetails?.username
      );

      if (!result.error) {
        setUserProfileDetails(false); // close modal
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      onClick={() => setUserProfileDetails((prev) => !prev)}
      className="fixed h-screen top-0 w-full flex items-center justify-center z-50 bg-black/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-xl w-full bg-gray-800 rounded-sm border border-gray-600 p-4"
      >
        <h1 className="text-white font-semibold mt-4 text-xl">
          Update Profile
        </h1>
        <div className="w-full flex flex-col gap-3 my-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              onChange={handleUpdateInput}
              type="text"
              placeholder="Username"
              value={updateProfile.username}
              name="username"
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
            <input
              onChange={handleUpdateInput}
              type="text"
              placeholder="Fullname"
              value={updateProfile.fullname}
              name="fullname"
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
            <input
              onChange={handleUpdateInput}
              type="email"
              placeholder="Email"
              value={updateProfile.email}
              name="email"
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
            <input
              onChange={handleUpdateInput}
              type="text"
              placeholder="Bio"
              value={updateProfile.bio}
              name="bio"
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-3">
            <input
              onChange={handleUpdateInput}
              type="password"
              placeholder="Current Password"
              name="currentPassword"
              value={updateProfile.currentPassword}
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
            <input
              onChange={handleUpdateInput}
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={updateProfile.newPassword}
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
            <input
              onChange={handleUpdateInput}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={updateProfile.confirmPassword}
              className="w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
            />
          </div>
          <input
            onChange={handleUpdateInput}
            type="text"
            placeholder="Links..."
            name="links"
            value={updateProfile.links}
            className="max-w-90 w-full p-3 outline-none border border-gray-600 text-xs rounded-md text-gray-300"
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="w-full text-white py-2 text-xs font-semibold bg-blue-700 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-800"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
