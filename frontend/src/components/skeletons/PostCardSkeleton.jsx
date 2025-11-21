import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="flex items-start gap-4 py-4 px-5 border-b border-gray-700 animate-pulse">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-700"></div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="h-3 w-16 bg-gray-700 rounded"></div>
            <div className="h-3 w-12 bg-gray-700 rounded"></div>
          </div>
          <div className="h-4 w-4 bg-gray-700 rounded"></div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 w-full">
          <div className="h-3 w-full bg-gray-700 rounded"></div>
          <div className="h-3 w-3/4 bg-gray-700 rounded"></div>
          <div className="w-full flex py-3 items-center justify-center rounded-md border border-gray-700">
            <div className="w-60 h-60 bg-gray-700 rounded-md"></div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex items-center justify-between pt-2">
          <div className="h-4 w-8 bg-gray-700 rounded"></div>
          <div className="h-4 w-8 bg-gray-700 rounded"></div>
          <div className="h-4 w-8 bg-gray-700 rounded"></div>
          <div className="h-4 w-8 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
