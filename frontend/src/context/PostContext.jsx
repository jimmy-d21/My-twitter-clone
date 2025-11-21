import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const BACKENDURL = "http://localhost:5000";
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllPosts = async (postUrl) => {
    try {
      const { data } = await axios.get(`${BACKENDURL}${postUrl}`, {
        withCredentials: true,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      // SAVE POSTS TO STATE
      setAllPosts(data);
    } catch (error) {
      toast.error("fetchAllPosts failed");
    }
  };

  const fetchCreatePost = async (createPost) => {
    try {
      const { data } = await axios.post(
        `${BACKENDURL}/api/posts/create`,
        createPost,
        { withCredentials: true }
      );

      if (data.error) {
        toast.error(data.error);
        return { error: data.error };
      }

      // ✅ Immediately update posts list with the new post
      setAllPosts((prev) => [data.createdPost, ...prev]);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Create post failed");
      return { error: "Create post failed" };
    }
  };

  const fetchDeletePost = async (postId) => {
    try {
      const { data } = await axios.delete(
        `${BACKENDURL}/api/posts/delete-post/${postId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAllPosts((prev) =>
        prev.filter((post) => post._id !== data.deletePost._id)
      );
    } catch (error) {
      console.log(`Error in : fetchDeletePost`);
    }
  };

  const fetchLikeUnlike = async (postId) => {
    try {
      const { data } = await axios.put(
        `${BACKENDURL}/api/posts/like-unlike-post/${postId}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post
        )
      );
      return data.updatedPost;
    } catch (error) {
      toast.error("fetchLikeUnlike Failed");
      throw error;
    }
  };

  // In PostContext.jsx
  const fetchCommentPost = async (postId, text) => {
    try {
      const { data } = await axios.put(
        `${BACKENDURL}/api/posts/comment-post/${postId}`,
        { text },
        { withCredentials: true }
      );
      toast.success(data.message);

      // ✅ Update the specific post in allPosts
      setAllPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post
        )
      );

      return data;
    } catch (error) {
      toast.error("fetchCommentPost Failed");
      throw error;
    }
  };

  const value = {
    fetchAllPosts,
    allPosts,
    fetchCreatePost,
    fetchDeletePost,
    fetchLikeUnlike,
    fetchCommentPost,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};

export default PostContextProvider;
