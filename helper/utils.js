import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
import multer from "multer";
import path from "path";
export const authorizeUser = () => {
  return (req, res, next) => {
    try {
      const bearerHeader = req.headers.bearer;

      if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[0]; // Extract the token from the header
        // You can perform token validation or authorization logic here
        jwt.verify(
          bearerToken,
          process.env.SECRET_KEY,
          async (err, data) => {
            if (err) {
              return apiResponse(res, { statusCode: 400, error: err });
            }
            const userExist = await user.findOne({ _id: data._id });
            if (userExist) {
              req.user = data; // Assign the token to the request object
              next();
            } else {
              return apiResponse(res, {
                statusCode: 400,
                error: "Token is not valid",
              });
            }
          }
        );
      } else {
        return apiResponse(res, {
          statusCode: 400,
          error: "Please Send Token",
        });
      }
    } catch (error) {
      return apiResponse(res, { statusCode: 400, error: error });
    }
  };
};

//mock response data
const mockResponse = {
  data: {},
  statusCode: 200,
  error: "",
  message: "",
};

// helper function to send the response from the apis
export const apiResponse = (res, response) => {
  return res
    .status(response.statusCode || 200)
    .send({ ...mockResponse, ...response });
};


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,path.resolve()+'/uploads/images')
  },
  filename:(req,file,cb)=>{
    cb(null,req.user.userName+'_'+file.originalname)
  }
}) 
export const upload = multer({storage:storage})