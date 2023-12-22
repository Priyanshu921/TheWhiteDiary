import { clearNotifications, getNotifications, getUserNames, readNotifications, signUpUser, userLogin } from "../controllers/user.controller.js";
import express from 'express';
import { authorizeUser } from "../helper/utils.js";
const userRoutes = express();
userRoutes.post('/register',signUpUser)
userRoutes.post("/login", userLogin);
userRoutes.get("/getUserNames",getUserNames);
userRoutes.get("/notications",authorizeUser(),getNotifications)
userRoutes.delete("/notications", authorizeUser(), clearNotifications);
userRoutes.post("/notications/read", authorizeUser(), readNotifications);
export default userRoutes

