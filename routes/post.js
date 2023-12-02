import express from "express";
import { addLike, createPost, getPosts, removeLike } from "../controllers/post.controller";
import { authorizeUser, upload } from "../helper/utils";
const postRoutes = express();
postRoutes.post("/createPost",authorizeUser(),upload.single('image'), createPost);
postRoutes.post('/likePost',authorizeUser(),addLike)
postRoutes.post('/unlikePost',authorizeUser(),removeLike)
postRoutes.get("/",authorizeUser(), getPosts);
export default postRoutes;
