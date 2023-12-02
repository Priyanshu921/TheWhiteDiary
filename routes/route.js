import express from "express";
import userRoutes from "./auth";
import quoteRoutes from "./quote";
import postRoutes from "./post";
import path from "path";
const router = express()
router.use("/image", express.static(path.resolve() + "/uploads/images"));
router.use("/user", userRoutes);
router.use("/quote", quoteRoutes);
router.use("/post",postRoutes)
export default router
