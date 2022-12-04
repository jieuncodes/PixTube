import Video from "../models/Video";
import User from "../models/User";
import { format } from "timeago.js";
import { resourceUsage } from "process";

export const videos = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });

  return res.render("video/videos_main", { pageTitle: "Videos", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  if (!video) {
    return res
      .status(404)
      .render("pages/error/404", { pageTitle: "Video not found." });
  }
  const updatedTimeago = format(video.createdAt, "ko_KR");

  // console.log(video);
  return res.render("video/watch", {
    pageTitle: "Videos",
    video,
    updatedTimeago,
  });
};

export const getUpload = (req, res) => {
  return res.render("video/video_upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const { video, thumb } = req.files;
  console.log(req.files);
  try {
    const newVideo = await Video.create({
      videoPath: video[0].path,
      thumbPath: thumb[0].path,
      title,
      description,
      createdAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
      meta: {
        views: 0,
      },
      owner: _id,
    });

    if (video[0].size > 100 * 1024 * 1024) {
      return res.status(500).render("video/video_upload", {
        errorMessage: "File size should be less than 100Mb!",
      });
    }
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/videos");
  } catch (error) {
    return res.status(400).render("video/video_upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res
      .status(404)
      .render("pages/error/404", { pageTitle: "Video not found." });
  }
  return res.render("video/video_edit", {
    pageTitle: `Edit: ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res
      .status(404)
      .render("pages/error/404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/videos");
};

export const search = async (req, res) => {
  const keyword = req.query.search;
  let videos = [];

  try {
    if (keyword === "") {
      return res.render("pages/search", {
        pageTitle: `Please type any keyword for search`,
        keyword,
      });
    } else if (keyword) {
      videos = await Video.find({
        title: {
          $regex: new RegExp(keyword, "i"),
        },
      }).populate("owner");
      return res.render("pages/search", {
        pageTitle: `Search: ${req.query.search}`,
        videos,
      });
    }
  } catch (e) {
    return res
      .status(404)
      .render("pages/error/404", { pageTitle: `Something went wrong.` });
  }
};

export const postRegisterView = async (req, res) => {
  const {
    params: {id}
  } = req;
  try {
    const video = await Video.findById(id);
    video.meta.views += 1;
    video.save();
    console.log('register view', );
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}