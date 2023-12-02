import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comments: {
      type: [
        {
          commentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          comment: {
            type: String,
          },
        },
      ],
    },
    likes: {
      type: [
        {
          likedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const post = mongoose.model("post", postSchema);
