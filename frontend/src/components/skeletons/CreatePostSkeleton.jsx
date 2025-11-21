import React from "react";

const CreatePostSkeleton = () => {
  return (
    <div className="flex items-start gap-4 py-4 px-5 border-b border-gray-700 animate-pulse">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-700"></div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">
        {/* Textarea placeholder */}
        <div className="w-full h-20 bg-gray-700 rounded-md"></div>

        {/* Actions */}
        <div className="w-full border-t border-gray-700 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-700 rounded"></div>
              <div className="w-5 h-5 bg-gray-700 rounded"></div>
            </div>
            <div className="w-16 h-8 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostSkeleton;
