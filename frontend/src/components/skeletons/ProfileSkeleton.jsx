import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="h-screen flex flex-col w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-700">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-gray-700 rounded"></div>
          <div className="h-3 w-16 bg-gray-600 rounded"></div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
        {/* Cover Image Skeleton */}
        <div className="w-full h-48 bg-gray-700"></div>

        {/* Profile Image + Buttons Fake Holder */}
        <div className="flex justify-between py-5 px-5">
          <div className="-mt-20 w-32 h-32 bg-gray-700 rounded-full border-2 border-gray-800"></div>

          <div className="flex gap-2 mt-6">
            <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
            <div className="h-8 w-20 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="my-3 px-5 flex flex-col gap-3 pt-5">
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
          <div className="h-3 w-24 bg-gray-600 rounded"></div>
          <div className="h-3 w-full bg-gray-700 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-700 rounded"></div>

          {/* Links + Date */}
          <div className="flex gap-6 pt-2">
            <div className="h-3 w-20 bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-700 rounded"></div>
          </div>

          {/* Followers */}
          <div className="flex gap-6 pt-2">
            <div className="h-3 w-20 bg-gray-700 rounded"></div>
            <div className="h-3 w-20 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-gray-700 px-5 pb-2">
          <div className="h-6 w-20 bg-gray-700 rounded"></div>
          <div className="h-6 w-20 bg-gray-700 rounded"></div>
        </div>

        {/* Posts Skeleton */}
        <div className="flex flex-col gap-6 p-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-1/3 bg-gray-700 rounded"></div>
                <div className="h-3 w-full bg-gray-700 rounded"></div>
                <div className="h-3 w-2/3 bg-gray-700 rounded"></div>
                <div className="h-40 w-full bg-gray-700 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
