import React from "react";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment, setcommentDetails }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${comment?.user?.username}`);
    setcommentDetails(null);
  };

  return (
    <div className="w-full flex items-start gap-2 mb-2">
      <div
        onClick={handleViewProfile}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src={comment?.user?.profileImage || "/avatar-placeholder.png"}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <h1
            onClick={handleViewProfile}
            className="text-white text-sm font-semibold cursor-pointer"
          >
            {comment?.user?.fullname}
          </h1>
          <h1
            onClick={handleViewProfile}
            className="text-gray-600 text-xs cursor-pointer"
          >
            @{comment?.user?.username}
          </h1>
        </div>
        <p className="text-xs text-white ">{comment?.text}</p>
      </div>
    </div>
  );
};

export default Comment;
