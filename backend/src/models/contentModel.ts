import { timeStamp } from "console";
import mongoose, { mongo } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["document", "tweet", "youtube", "link"],
      required: true,
    },
    link: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
        ref: "Tags",
      },
    ],
    userId: {
      type: String,
      ref: "User",
    },
    shareable: {
      type: Boolean,
      default: false,
    },
    shareableId: {
      type: String,
      default: uuidv4,
    },
    shareableLink: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.pre("save", function (next) {
  if (this.shareableId && !this.shareableLink) {
    this.shareableLink = `http://localhost:3000/api/v1/content/shared/watch/${this.shareableId}`;
  }
  next();
});

const Content = mongoose.model("Content", contentSchema);
export default Content;
