import React, { useContext } from "react";
import { formatPostDate } from "../utils/formatDate.js";
import { FaTrash, FaRegComment, FaHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext.jsx";
import { PostContext } from "../context/PostContext.jsx";

const PostCard = ({ post, setcommentDetails }) => {
  const { authUser } = useContext(AuthContext);
  const { fetchDeletePost, fetchLikeUnlike } = useContext(PostContext);
  const navigate = useNavigate();

  const isMyPost = authUser?._id === post?.owner?._id;
  const isLiked = post?.likes?.includes(authUser?._id);

  const handleVisitProfile = () => {
    navigate(`/profile/${post?.owner?.username}`);
  };

  const handleLikeUnlike = async () => {
    try {
      await fetchLikeUnlike(post?._id);
    } catch (error) {
      toast.error("Error in handleLikeUnlike");
    }
  };

  const handleDeletePost = async () => {
    try {
      await fetchDeletePost(post?._id);
    } catch (error) {
      console.log(`Error in : handleDeletePost`);
    }
  };

  return (
    <div className="flex items-start gap-4 py-4 px-5 border-b border-gray-700">
      {/* Avatar */}
      <div
        onClick={handleVisitProfile}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src={post?.owner?.profileImage || "/avatar-placeholder.png"}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>

      {/* Post Content */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3
              onClick={handleVisitProfile}
              className="text-white text-sm font-semibold cursor-pointer"
            >
              {post?.owner?.fullname}
            </h3>
            <span className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <p onClick={handleVisitProfile} className="cursor-pointer">
                @{post?.owner?.username}
              </p>
              <span>.</span>
              <p>{formatPostDate(post?.createdAt)}</p>
            </span>
          </div>
          {isMyPost && (
            <FaTrash
              onClick={handleDeletePost}
              className="h-4 w-4 text-white cursor-pointer hover:text-red-500"
            />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 w-full">
          {post?.text && <p className="text-gray-300 text-sm">{post?.text}</p>}
          {post?.image && (
            <div className="w-full flex py-3 items-center justify-center rounded-md border border-gray-700">
              <div className="w-60 h-60 rounded overflow-hidden">
                <img
                  src={post?.image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="w-full flex items-center justify-between pt-2">
          <div
            onClick={() => setcommentDetails(post)}
            className="flex items-center gap-1 text-sm cursor-pointer text-gray-500 transition-all duration-300 hover:text-green-600"
          >
            <FaRegComment className="w-4 h-4 hover:scale-110" />
            <span>{post?.comments?.length}</span>
          </div>
          <BiRepost className="w-6 h-6 text-sm text-gray-500" />
          <div
            onClick={handleLikeUnlike}
            className={`flex items-center gap-1 text-sm cursor-pointer transition-all duration-300 hover:text-red-500 ${
              isLiked ? "text-pink-500" : "text-gray-500"
            }`}
          >
            <FaHeart className="w-5 h-5 hover:scale-110 transition-all duration-300" />
            <span>{post?.likes?.length}</span>
          </div>
          <CiBookmark className="w-6 h-6 text-sm text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
