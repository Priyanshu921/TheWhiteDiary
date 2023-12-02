import { getUserNames, signUpUser, userLogin } from "../controllers/user.controller.js";
import express from 'express';
const userRoutes = express();
userRoutes.post('/register',signUpUser)
userRoutes.post("/login", userLogin);
userRoutes.get("/getUserNames",getUserNames);
export default userRoutes

