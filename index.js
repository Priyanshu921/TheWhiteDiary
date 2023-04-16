import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";
import path from 'path';
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
 app.use(express.static('frontend/build'));
}
const port = process.env.PORT || 3001;
mongoose
  .connect(
    "mongodb+srv://priyanshu:priyanshu921@naruto.sf8tp46.mongodb.net/theWhiteDiary?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("listening at port 3001");
    });
  })
  .catch((error) => {
    console.log("No Database Found ");
  });

app.use("/api/",router)
