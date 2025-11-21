import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const SuggestedUsers = ({ user }) => {
  const { fetchFollorUnfollow } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFollowUnfollow = async () => {
    setIsLoading(true);
    try {
      await fetchFollorUnfollow(user?._id);
    } catch (error) {
      toast.error("handleFollowUnfollow Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <div className="overflow-hidden rounded-full h-8 w-8 object-cover">
        <img
          onClick={() => navigate(`/profile/${user?.username}`)}
          src={user?.profileImage || "/avatar-placeholder.png"}
          alt=""
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p
          onClick={() => navigate(`/profile/${user?.username}`)}
          className="text-white font-bold text-xs w-20 truncate"
        >
          {user?.username}
        </p>

        <p
          onClick={() => navigate(`/profile/${user?.username}`)}
          className="text-xs text-gray-600"
        >
          @{user?.username}
        </p>
      </div>
      <button
        onClick={handleFollowUnfollow}
        className="py-2 bg-white font-semibold text-xs rounded-full px-3 cursor-pointer"
      >
        {isLoading ? "Following..." : "Follow"}
      </button>
    </div>
  );
};

export default SuggestedUsers;
