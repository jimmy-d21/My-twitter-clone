import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const BACKENDURL = "http://localhost:5000";
  const [authUser, setAuthUser] = useState(null);

  const fetchSignUp = async (signupInput) => {
    try {
      const { data } = await axios.post(
        `${BACKENDURL}/api/auth/signup`,
        signupInput,
        { withCredentials: true }
      );

      if (data.error) {
        toast.error(data.error);
      }

      await fetchAuthUser();
      toast.success(data.message);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || "Signin failed");
    }
  };

  const fetchLoginUser = async (loginInput) => {
    try {
      const { data } = await axios.post(
        `${BACKENDURL}/api/auth/login`,
        loginInput,
        { withCredentials: true }
      );

      if (data.error) {
        toast.error(data.error);
        return { success: false };
      }

      await fetchAuthUser();
      toast.success(data.message);
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      return { success: false };
    }
  };

  const fetchAuthUser = async () => {
    try {
      const { data } = await axios.get(`${BACKENDURL}/api/auth/authUser`, {
        withCredentials: true,
      });

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setAuthUser(data);
    } catch (error) {
      setAuthUser(null);
    }
  };

  const fetchLogout = async () => {
    try {
      await axios.post(
        `${BACKENDURL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const value = {
    authUser,
    fetchLoginUser,
    fetchAuthUser,
    fetchSignUp,
    fetchLogout,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
