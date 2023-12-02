import express from "express";
import { addLike, createPost, getPosts, removeLike } from "../controllers/post.controller.js";
import { authorizeUser, upload } from "../helper/utils.js";
const postRoutes = express();
postRoutes.post("/createPost",authorizeUser(),upload.single('image'), createPost);
postRoutes.post('/likePost',authorizeUser(),addLike)
postRoutes.post('/unlikePost',authorizeUser(),removeLike)
postRoutes.get("/",authorizeUser(), getPosts);
export default postRoutes;
