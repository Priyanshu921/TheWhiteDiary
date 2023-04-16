import express from "express";
import userRoutes from "./auth";
import quoteRoutes from "./quote";
const router = express()
router.use("/user", userRoutes);
router.use("/quote", quoteRoutes);
export default router
