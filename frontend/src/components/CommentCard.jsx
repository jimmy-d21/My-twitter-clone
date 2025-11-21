import React, { useContext, useState } from "react";
import Comment from "./Comment";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext if needed
import toast from "react-hot-toast";

const CommentCard = ({ commentDetails, setcommentDetails }) => {
  const { fetchCommentPost, allPosts } = useContext(PostContext);
  const { authUser } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPost =
    allPosts.find((post) => post._id === commentDetails?._id) || commentDetails;

  const handleComment = async () => {
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetchCommentPost(currentPost?._id, text);
      setText("");
    } catch (error) {
      toast.error("Error adding comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleComment();
    }
  };

  return (
    <div
      onClick={() => setcommentDetails(null)}
      className="fixed top-0 h-screen w-full flex items-center justify-center bg-black/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-md w-full p-4 rounded-sm bg-gray-800 border border-gray-600"
      >
        <h1 className="text-white font-semibold text-lg mt-1 mb-3">COMMENTS</h1>

        {/* Comments List */}
        <div className="w-full flex flex-col gap-2 border-b border-gray-600 mb-2 pb-2 max-h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          {currentPost?.comments?.length > 0 ? (
            currentPost.comments.map((comment, index) => (
              <Comment
                key={comment._id || index}
                comment={comment}
                setcommentDetails={setcommentDetails}
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        {/* Comment Input */}
        <div className="w-full flex items-center gap-2">
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleKeyDown}
            placeholder="Add comments..."
            className="resize-none flex-1 h-20 border border-gray-600 p-2 text-sm font-medium rounded-sm outline-none text-gray-400 bg-gray-700 placeholder-gray-500 [&::-webkit-scrollbar]:hidden"
            disabled={isSubmitting}
          />
          <button
            onClick={handleComment}
            disabled={!text.trim() || isSubmitting}
            className="text-white py-2 px-5 text-xs bg-blue-500 rounded-full cursor-pointer transition-all duration-300 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
