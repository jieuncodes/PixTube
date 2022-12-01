import Comment from "../models/Comment";
import User from "../models/User";
import Video from "../models/Video";

export const createComment = async (req, res) => {
    const {
      session: { user },
      body: { text },
      params: { id },
    } = req;
    const commentOwner = await User.findById(user._id);
    const video = await Video.findById(id);
    if (!video) {
      return res.sendStatus(404);
    }
    const comment = await Comment.create({
      text,
      owner: commentOwner,
      ownerProfilePic: user.profilePicPath,
      ownerName: user.username,
      video: id,
    });
    commentOwner.comments.push(comment._id);
    video.comments.push(comment._id);
    commentOwner.save();
    video.save();
    return res.status(201).json({ newCommentId: comment._id, ownerId: commentOwner._id, videoId: video._id });
  };

export const updateComment = async(req, res) => {
  const {
    session: { user },
    body: { edittedText, commentId },
  } = req;
  const comment = await Comment.findById(commentId);
  console.log('comment', comment);

  if (!comment) {
    return res.sendStatus(404);
  }
  if (String(comment.owner) !== user._id) {
    return res.sendStatus(401);
  }
  await Comment.findByIdAndUpdate(commentId, { text: edittedText });
  return res.sendStatus(200);
};

export const deleteComment = async(req, res) => {
  console.log('deleting!!', );
  const {
    session: { user },
    params: { id },
  } = req;
  const comment = await Comment.findById(id);

  if (!comment) {
    return res.sendStatus(404);
  }
  if (String(comment.owner._id) !== user._id) {
    return res.sendStatus(401);
  }
  await Comment.findByIdAndDelete(id);
  const commentOwner = await User.findById(comment.owner._id);
  const video = await Video.findById(String(comment.video));
  await commentOwner.save();
  await video.save();

  return res.sendStatus(200);
}