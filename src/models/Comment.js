import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  ownerProfilePic: { type: String },
  ownerName: { type: String },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  createdAt: { type: Date, required: true, default: Date.now },
  createdTimeAgo: { type: String },
});

const Comment = mongoose.model("Comment", commentSchema);

commentSchema.static("formatCreatedAt", function (createdAt) {
  return format(createdAt, "ko_KR");
});

export default Comment;
