import React from "react";

const SuggestedUserSkeleton = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      {/* Avatar */}
      <div className="h-8 w-8 rounded-full bg-gray-700" />

      {/* Username and handle */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="h-3 w-20 bg-gray-700 rounded" />
        <div className="h-3 w-16 bg-gray-600 rounded" />
      </div>

      {/* Follow button */}
      <div className="h-7 w-16 bg-gray-700 rounded-full" />
    </div>
  );
};

export default SuggestedUserSkeleton;
