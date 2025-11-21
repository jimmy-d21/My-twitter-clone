import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const BACKENDURL = "http://localhost:5000";
  const [userProfile, setUserProfile] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const fetchUserProfile = async (username) => {
    try {
      const { data } = await axios.get(
        `${BACKENDURL}/api/users/profile/${username}`,
        { withCredentials: true }
      );
      setUserProfile(data);
    } catch (error) {
      toast.error("fetchUserProfile failed");
    }
  };

  const fetchSuggestedUsers = async () => {
    try {
      const { data } = await axios.get(
        `${BACKENDURL}/api/users/suggested-users`,
        {
          withCredentials: true,
        }
      );
      setSuggestedUsers(data);
    } catch (error) {
      console.log(`fetchSuggestedUsers`);
      toast.error("fetchSuggestedUsers failed");
    }
  };

  const fetchFollorUnfollow = async (userId) => {
    try {
      const { data } = await axios.put(
        `${BACKENDURL}/api/users/follow-unfollow/${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);

      await fetchSuggestedUsers();
    } catch (error) {
      toast.error("fetchFollorUnfollow Failed");
    }
  };

  const fetchUpdateUserProfile = async (updateProfile, username) => {
    try {
      const { data } = await axios.put(
        `${BACKENDURL}/api/users/update-profile`,
        updateProfile,
        { withCredentials: true }
      );

      await fetchUserProfile(username);

      if (data.error) {
        toast.error(data.error);
        return { error: data.error };
      } else {
        toast.success(data.message);
        return data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Update failed";
      toast.error(errorMessage);
      return { error: errorMessage };
    }
  };

  const value = {
    userProfile,
    fetchUserProfile,
    fetchSuggestedUsers,
    suggestedUsers,
    fetchFollorUnfollow,
    fetchUpdateUserProfile,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
