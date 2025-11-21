import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  deleteAllNotification,
  getAllNotifications,
  seenAllNotifications,
} from "../controllers/notification.controller.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/", authUser, getAllNotifications);
notificationRoutes.put(
  "/seen-notifications/:id",
  authUser,
  seenAllNotifications
);
notificationRoutes.delete("/", authUser, deleteAllNotification);

export default notificationRoutes;
