import React from "react";

const SelectFeedTypes = ({ feedTypes, setFeedTypes }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-700">
      {/* For You */}
      <div
        className="w-full flex flex-col items-center cursor-pointer pt-3"
        onClick={() => setFeedTypes("For you")}
      >
        <span className="text-center text-gray-300 text-sm font-light">
          For You
        </span>
        <span
          className={`h-[3px] rounded-full mt-2 transition-all duration-200 ${
            feedTypes === "For you" ? "w-9 bg-blue-500" : "w-0 bg-transparent"
          }`}
        ></span>
      </div>

      {/* Following */}
      <div
        className="w-full flex flex-col items-center cursor-pointer  pt-3"
        onClick={() => setFeedTypes("Following")}
      >
        <span className="text-center text-gray-300 text-sm font-light">
          Following
        </span>
        <span
          className={`h-[3px] rounded-full mt-2 transition-all duration-200 ${
            feedTypes === "Following" ? "w-9 bg-blue-500" : "w-0 bg-transparent"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default SelectFeedTypes;
