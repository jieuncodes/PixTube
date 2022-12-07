import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 15 },
  description: { type: String, trim: true, maxLength: 200 },
  createdAt: { type: String, default: Date.now },
  videoPath: { type: String, required: true },
  thumbPath: { type: String, required: true },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
  ],
  ownerAvatarPath: { type: String },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
