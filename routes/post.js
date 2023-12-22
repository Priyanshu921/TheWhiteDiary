import express from "express";
import { addLike, createPost, deletePost, getPosts, getSinglePost, removeLike } from "../controllers/post.controller.js";
import { authorizeUser, upload } from "../helper/utils.js";
const postRoutes = express();
postRoutes.post("/createPost",authorizeUser(),upload.single('image'), createPost);
postRoutes.post('/likePost',authorizeUser(),addLike)
postRoutes.post('/unlikePost',authorizeUser(),removeLike)
postRoutes.get("/",authorizeUser(), getPosts);
postRoutes.get("/:postID",authorizeUser(),getSinglePost)
postRoutes.delete("/:postID",deletePost)
// postRoutes
export default postRoutes;
