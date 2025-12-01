import React, { useRef, useState, useContext } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaFaceSmile } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import CreatePostSkeleton from "./skeletons/CreatePostSkeleton";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../context/PostContext";
import toast from "react-hot-toast";

const CreatePost = ({ isLoading, authUser }) => {
  const { fetchCreatePost } = useContext(PostContext);
  const [isCreating, setIsCreating] = useState(false);

  // ✅ single source of truth
  const [createPost, setCreatePost] = useState({
    text: "",
    image: null,
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  if (isLoading) return <CreatePostSkeleton />;

  // Handle text input
  const handleTextChange = (e) => {
    setCreatePost((prev) => ({ ...prev, text: e.target.value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePost((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle post creation
  const handleCreatePost = async () => {
    setIsCreating(true);
    try {
      const data = await fetchCreatePost({ ...createPost });

      if (!data.error) {
        toast.success(data.message);
        setCreatePost({ text: "", image: null }); // reset state
        fileInputRef.current.value = null;
      }
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex items-start gap-4 py-4 px-5 border-b border-gray-700">
      {/* Avatar */}
      <div
        onClick={() => navigate(`/profile/${authUser?.username}`)}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src={authUser?.profileImage || "/avatar-placeholder.png"}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>

      {/* Post Input */}
      <div className="flex-1 flex flex-col gap-2">
        <textarea
          onChange={handleTextChange}
          value={createPost.text}
          placeholder="What is happening?!"
          className="w-full h-20 border-b border-gray-700 outline-none text-sm text-white resize-none placeholder:text-gray-500"
        ></textarea>

        {/* Image Preview */}
        {createPost.image && (
          <div className="w-full flex justify-center mb-2">
            <div className="relative">
              <img
                src={createPost.image}
                className="w-64 h-64 object-cover rounded-md"
                alt="preview"
              />
              <button
                onClick={() => {
                  setCreatePost((prev) => ({ ...prev, image: null }));
                  fileInputRef.current.value = null;
                }}
                className="absolute top-0 right-0 bg-black/60 rounded-full p-1 cursor-pointer"
              >
                <IoClose className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="w-full border-t border-gray-700 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label htmlFor="fileInput">
                <CiImageOn className="h-6 w-6 cursor-pointer text-blue-500" />
              </label>
              <input
                id="fileInput"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <FaFaceSmile className="w-5 h-5 text-blue-500" />
            </div>

            <button
              onClick={handleCreatePost}
              className="text-white py-2 px-5 text-xs bg-blue-500 rounded-full cursor-pointer transition-all disabled:bg-blue-800 duration-300 hover:bg-blue-700"
            >
              {isCreating ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
