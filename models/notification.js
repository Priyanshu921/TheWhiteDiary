import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  unreadNotifications: {
    type: Number,
    required: false,
  },
  notifications: {
    type: [
      {
        postID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "post",
        },
        message: {
          type: String,
        },
      },
    ],
  },
});

export const notificationModel = mongoose.model('notification',notificationSchema)