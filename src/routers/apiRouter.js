import express from "express";
import { createComment, updateComment, deleteComment } from "../controllers/commentController";
import { postRegisterView } from "../controllers/videoController";


const apiRouter = express.Router();
const VIDEO_ID_URL = "/videos/:id([0-9a-f]{24})";
const COMMENT_ID_URL = "/videos/:id([0-9a-f]{24})";

apiRouter.post(`${VIDEO_ID_URL}/view`,postRegisterView);
apiRouter.post(`${VIDEO_ID_URL}/comment`, createComment);
apiRouter.put(`${COMMENT_ID_URL}/comment`, updateComment);
apiRouter.delete(`${VIDEO_ID_URL}/comment`, deleteComment);


export default apiRouter;