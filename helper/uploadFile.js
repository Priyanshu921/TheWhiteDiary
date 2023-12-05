import fs from "fs";
import path from "path";
import process from "process";
import { google } from "googleapis";
import {pkey} from "./pkey.js";
const scopes = ["https://www.googleapis.com/auth/drive.file"];

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
  const drive = google.drive({ version: "v3", auth: authClient });
const filePath = path.join(path.resolve(), "uploads", "images", filename);
  const file = await drive.files.create({
    media: {
      //   body: fs.createReadStream("../uploads/images/" + filename),
      body: fs.createReadStream(filePath),
    },
    fields: "id,webViewLink",
    requestBody: {
      name: path.basename(filename),
    },
  });
  const permissionsResponse = await drive.permissions.create({
    fileId: file.data.id,
    requestBody: {
      type: "anyone", // Specify the permission type
      role: "writer",
    },
  });
 console.log(permissionsResponse);
  return file;
}