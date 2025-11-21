import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const BACKENDURL = "http://localhost:5000";
  const [allNotifications, setAllNotifications] = useState([]);

  const fetchAllNotifications = async () => {
    try {
      const { data } = await axios.get(`${BACKENDURL}/api/notifications`, {
        withCredentials: true,
      });
      setAllNotifications(data);
    } catch (error) {
      toast.error("fetchAllNotifications failed");
    }
  };

  const fetchSeenAllNotif = async (userId) => {
    try {
      await axios.put(
        `${BACKENDURL}/api/notifications/seen-notifications/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      await fetchAllNotifications(); // call it to see the result
    } catch (error) {
      toast.error("fetchSeenAllNotif failed");
    }
  };

  const fetchDelelteAllNotif = async () => {
    try {
      const { data } = await axios.delete(`${BACKENDURL}/api/notifications`, {
        withCredentials: true,
      });

      await fetchAllNotifications(); // call it to see the result
      toast.success(data.message);
    } catch (error) {
      toast.error("fetchDelelteAllNotif failed");
    }
  };

  const value = {
    fetchAllNotifications,
    allNotifications,
    fetchSeenAllNotif,
    fetchDelelteAllNotif,
  };
  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContextProvider;
