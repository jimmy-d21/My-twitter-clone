import React, { useContext, useEffect, useState } from "react";
import SuggestedUsers from "./SuggestedUsers";
import toast from "react-hot-toast";
import SuggestedUserSkeleton from "./skeletons/SuggestedUserSkeleton";
import { UserContext } from "../context/UserContext";

const Rightbar = () => {
  const { suggestedUsers, fetchSuggestedUsers } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const loadSuggestedUsers = async () => {
    setIsLoading(true);
    try {
      await fetchSuggestedUsers();
    } catch (error) {
      toast.error("loadSuggestedUsers Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestedUsers();
  }, []);
  return (
    <div className="h-screen pt-4 pl-4 border-l border-gray-700">
      <div className="flex flex-col gap-3 p-4 pt-4 min-w-60 bg-black rounded-md">
        {!isLoading ? (
          <h1 className="text-white text-sm">Who to follow</h1>
        ) : (
          <h1 className="h-3 w-30 bg-gray-600 rounded-full animate-pulse"></h1>
        )}
        <div className="flex flex-col gap-4 overflow-y-scroll min-h-50 max-h-80 [&::-webkit-scrollbar]:hidden">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SuggestedUserSkeleton key={i} />
              ))
            : suggestedUsers.map((user) => (
                <SuggestedUsers key={user?._id} user={user} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
