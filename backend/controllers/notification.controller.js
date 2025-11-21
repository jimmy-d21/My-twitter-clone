import Notification from "../models/notification.model.js";

export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({
      sendTo: userId,
    })
      .populate({
        path: "commingFrom",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(`Error in getAllNotifications controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const seenAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.updateMany(
      { sendTo: userId, seen: false },
      { $set: { seen: true } }
    );

    const notifications = await Notification.find({
      sendTo: userId,
    }).populate({
      path: "commingFrom",
      select: "-password",
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(`Error in seenAllNotifications controller: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAllNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ sendTo: userId });
    res
      .status(200)
      .json({ message: "Deleted all notifications successfully " });
  } catch (error) {
    console.error(
      `Error in deleteAllNotification controller: ${error.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};
