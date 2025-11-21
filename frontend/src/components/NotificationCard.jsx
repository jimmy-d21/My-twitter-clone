import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ notification }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 items-start gap-2 py-3 px-4 border-b border-gray-600">
      {notification?.type === "like" && (
        <FaHeart className="text-red-500 h-6 w-6 mt-[3px]" />
      )}
      {notification?.type === "follow" && (
        <FaUser className="text-blue-500 h-6 w-6 mt-[3px]" />
      )}
      {notification?.type === "comment" && (
        <FaComment className="text-green-500 h-6 w-6 mt-[3px]" />
      )}
      <div className="flex flex-col gap-1.5">
        <div
          onClick={() =>
            navigate(`/profile/${notification?.commingFrom?.username}`)
          }
          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        >
          <img
            src={
              notification?.commingFrom?.profileImage ||
              "/avatar-placeholder.png"
            }
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex items-center gap-2">
          <span
            onClick={() =>
              navigate(`/profile/${notification?.commingFrom?.username}`)
            }
            className="text-white text-sm font-semibold cursor-pointer"
          >
            @{notification?.commingFrom?.fullname}{" "}
          </span>
          <span className="text-gray-300 text-sm font-normal">
            {notification?.type === "follow"
              ? "followed you"
              : notification?.type === "like"
              ? "liked your post"
              : "comment on your post"}{" "}
          </span>
        </div>
        {notification?.type === "comment" && (
          <p className="text-gray-300 text-sm font-normal w-50 truncate">
            {`Comment : ${notification?.text}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
