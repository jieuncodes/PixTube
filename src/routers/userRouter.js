import express from "express";
import {
  getJoin,
  postJoin,
  account,
  getLogin,
  postLogin,
  logout,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { profilePicUpload, loggedInOnlyMiddleware, publicOnlyMiddleware} from "../middlewares";

const userRouter = express.Router();

userRouter.route("/join").get(publicOnlyMiddleware, getJoin).post(profilePicUpload.single("profile_pic"), postJoin);
userRouter.route("/login").get(publicOnlyMiddleware, getLogin).post(postLogin);
userRouter.get("/logout", logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

userRouter.route("/edit").get(loggedInOnlyMiddleware, getEdit).post(profilePicUpload.single("profile_pic"), postEdit);
userRouter
  .route("/change_password")
  .get(loggedInOnlyMiddleware, getChangePassword)
  .post(postChangePassword);
userRouter.route("/:id").get(account);

export default userRouter;
