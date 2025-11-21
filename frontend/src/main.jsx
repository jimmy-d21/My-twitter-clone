import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import PostContextProvider from "./context/PostContext.jsx";
import NotificationContextProvider from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <NotificationContextProvider>
            <App />
          </NotificationContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
