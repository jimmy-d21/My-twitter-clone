import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import NotificationCard from "../../components/NotificationCard.jsx";
import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContext.jsx";

const Notification = () => {
  const { allNotifications, fetchDelelteAllNotif } =
    useContext(NotificationContext);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteAllNotif = async () => {
    await fetchDelelteAllNotif();
  };

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="flex items-center justify-between py-5 px-4 border-b border-gray-600 relative">
        <h1 className="text-white font-semibold text-sm">Notifications</h1>

        {/* SETTINGS BUTTON */}
        <div
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="relative"
        >
          <IoSettingsOutline className="text-gray-300 h-4 w-4 font-semibold cursor-pointer" />

          {/* DELETE ALL DROPDOWN */}
          {showDelete && (
            <div
              onClick={handleDeleteAllNotif}
              className="absolute bottom-[-17px] right-[-15px] text-center w-[100px] text-white py-2 px-3 text-xs bg-gray-800 border border-gray-600 rounded-md font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-900"
            >
              Delete All
            </div>
          )}
        </div>
      </div>

      {allNotifications.length > 0 ? (
        <div className="w-full flex flex-col overflow-y-scroll max-h-7xl [&::-webkit-scrollbar]:hidden">
          {allNotifications.map((notification) => (
            <NotificationCard
              key={notification?._id}
              notification={notification}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-sm font-bold mt-5">
          No notifications 🙅‍♂️
        </p>
      )}
    </div>
  );
};

export default Notification;
