import express from "express";
import userRoutes from "./auth.js";
import quoteRoutes from "./quote.js";
import postRoutes from "./post.js";
import path from "path";
const router = express()
router.use("/image", express.static(path.resolve() + "/uploads/images"));
router.use("/user", userRoutes);
router.use("/quote", quoteRoutes);
router.use("/post",postRoutes)
export default router
