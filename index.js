import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";
import path from 'path';
import dotenv from "dotenv";
import { socket } from "./helper/socket.js";
dotenv.config();
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api/",router)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
 app.use(express.static('frontend/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve() + "/frontend/build/index.html"));
  });
}
const port = process.env.PORT || 3001;
mongoose
  .connect(process.env.DB_URL)
  .then(async() => {
    const server = app.listen(port);
    const io = socket.io(server);
    io.on('connection',(socket)=>{
      console.log("socket connection running on port, "+socket)
    })
    console.log("Server running on port: 3001");
  })
  .catch((error) => {
    console.log("No Database Found ");
  });

