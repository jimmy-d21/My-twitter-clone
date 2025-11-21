import { useContext, useEffect } from "react";
import PostCard from "./PostCard";
import PostCardSkeleton from "./skeletons/PostCardSkeleton";
import { PostContext } from "../context/PostContext";

const PostContainer = ({ feedTypes, setcommentDetails, username, userId }) => {
  const { fetchAllPosts, allPosts } = useContext(PostContext);

  const getPostFetchUrl = () => {
    switch (feedTypes) {
      case "Following":
        return `/api/posts/all-following-post/${userId}`;
      case "Posts":
        return `/api/posts/all-user-post/${username}`;
      case "Likes":
        return `/api/posts/all-liked-post/${username}`;
      default:
        return `/api/posts/all-post`;
    }
  };

  useEffect(() => {
    fetchAllPosts(getPostFetchUrl());
  }, [feedTypes, username]);

  const isLoading = !allPosts; // simple loading state

  return (
    <div className="h-screen max-h-7xl">
      <div className="flex flex-col gap-4">
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        {allPosts.length === 0 && (
          <p className="w-full h-50 flex items-center justify-center text-gray-500 text-xl font-md">
            No post available 😞
          </p>
        )}
        {!isLoading &&
          allPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              setcommentDetails={setcommentDetails}
              getPostFetchUrl={getPostFetchUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
