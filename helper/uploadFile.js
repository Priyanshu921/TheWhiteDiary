import fs from "fs";
import path from "path";
import process from "process";
import { google } from "googleapis";
import { pkey } from "./pkey.js";
import { v2 as cloudinary } from "cloudinary";
const scopes = ["https://www.googleapis.com/auth/drive.file"];

cloudinary.config({
  cloud_name: "dr0xlwrnz",
  api_key: "851335746992214",
  api_secret: "1VxUm9-9x0HGyJ-pHxuBWAkS_fE",
});
// authorize user and return jwt token
export async function authorize() {
  const jwtClient = new google.auth.JWT(
    pkey.client_email,
    null,
    pkey.private_key,
    scopes
  );
  await jwtClient.authorize();
  return jwtClient;
}


export async function uploadFile(authClient, filename) {
  try{
    const filePath = path.join(path.resolve(), "uploads", "images", filename);
    const file = await cloudinary.uploader.upload(filePath, {
      public_id: filename,
    });
    return file;
  }
  catch(error){
    return new Error(error.message)
  }
}

export async function deleteFile(authClient, fileID) {
  try {
    const fileDeleted = await cloudinary.uploader.destroy(fileID)
    return fileDeleted.status;
  } catch (error) {
    return new Error(error.message);
  }
}
