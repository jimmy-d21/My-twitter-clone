import React, { use } from "react";
import XSvg from "./svgs/X";
import { GoHomeFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";

const Sidebar = () => {
  const { fetchAllNotifications, allNotifications, fetchSeenAllNotif } =
    useContext(NotificationContext);
  const { fetchLogout, authUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetchLogout();
    console.log("logout");
  };

  const loadAllNotif = async () => {
    await fetchAllNotifications();
  };

  const handleSeenAllNotif = async () => {
    navigate("/notifications");
    await fetchSeenAllNotif(authUser?._id);
  };

  useEffect(() => {
    loadAllNotif();
  }, []);

  const totalUseenNotif = allNotifications.filter((n) => !n.seen);

  return (
    <div className="h-screen max-w-[200px] pt-2 pb-10 flex flex-col justify-between border-r border-gray-700">
      <div className="flex flex-col gap-11">
        <XSvg
          onClick={() => navigate("/")}
          className="lg:w-2/9 fill-white cursor-pointer"
        />
        <ul className="w-full flex flex-col gap-5">
          <li
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <GoHomeFill className="h-7 w-7 text-white" />
            <span className="text-gray-300  text-base leading-none">Home</span>
          </li>
          <li
            onClick={handleSeenAllNotif}
            className="flex items-center gap-3 cursor-pointer relative"
          >
            <IoIosNotifications className="h-7 w-7 text-white " />
            {totalUseenNotif.length > 0 && (
              <div className="absolute top-0 left-3 text-white bg-red-500 rounded-full text-xs font-semibold h-5 w-5 flex items-center justify-center">
                {totalUseenNotif.length}
              </div>
            )}
            <span className="text-gray-300  text-base leading-none">
              Notifications
            </span>
          </li>
          <li
            onClick={() => navigate(`/profile/${authUser?.username}`)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <FaUser className="h-7 w-7 text-white" />
            <span className="text-gray-300 text-base leading-none">
              Profile
            </span>
          </li>
        </ul>
      </div>
      <div className="w-full flex items-center gap-3 cursor-pointer">
        <div className="overflow-hidden rounded-full h-8 w-8 object-cover">
          <img
            onClick={() => navigate(`/profile/${authUser?.username}`)}
            src={authUser?.profileImage || "/avatar-placeholder.png"}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <p
              onClick={() => navigate(`/profile/${authUser?.username}`)}
              className="text-white font-bold text-xs w-25 truncate"
            >
              {authUser?.username}
            </p>
            <div
              onClick={handleLogout}
              className="rounded-full flex items-center justify-center w-9 h-9 cursor-pointer transition-all duration-300 hover:bg-gray-500"
            >
              <RiLogoutBoxLine className="w-4 h-4 text-white" />
            </div>
          </div>
          <p
            onClick={() => navigate(`/profile/${authUser?.username}`)}
            className="text-xs text-gray-600 mt-[-5px]"
          >
            @{authUser?.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
