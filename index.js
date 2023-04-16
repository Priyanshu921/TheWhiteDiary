import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/route.js";
import path from 'path';
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
  .connect(
    "mongodb+srv://priyanshu:priyanshu921@naruto.sf8tp46.mongodb.net/theWhiteDiary?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("listening at port "+port);
    });
  })
  .catch((error) => {
    console.log("No Database Found ");
  });

