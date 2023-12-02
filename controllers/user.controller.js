import { user } from "../models/user";
import bcrypt from "bcrypt";
import { userName } from "../models/username";
import jwt from 'jsonwebtoken';

export const signUpUser = async (req, res) => {
  const { email, password, confirmPassword, userNameCategory } = req.body;
  try {
    const userFound = await user.findOne({ email: email });
    if (userFound) {
      return res
        .status(409)
        .send({
          statusCode: 409,
          error: "user already exist",
          data: {},
          message: "",
        });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({
          statusCode: 400,
          error: "password does not match",
          data: {},
          message: "",
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const noOfUserNames = await userName.count({ category: userNameCategory });
    const selectedUserName = await userName.findOne({category:userNameCategory}).skip(Math.floor(Math.random() * noOfUserNames));
    const generatedUserName = selectedUserName.name+new Date().getDate()+new Date().getTime();
    const userCreated = await user.create({ email, password: hashedPassword, userName:generatedUserName});
    if (userCreated) {
      return res
        .status(201)
        .send({
          statusCode: 201,
          error: "",
          data: {},
          message: "user created successfully",
        });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({
        statusCode: 400,
        error: "probelem while creating user ",
        data: {},
        message: "",
      });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await user.findOne({ email }).lean().exec();
    if (!userExist) {
      return res
        .status(403)
        .send({
          statusCode: 403,
          error: "Invalid email",
          data: {},
          message: "",
        });
    }
    const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (!passwordMatched) {
      return res
        .status(403)
        .send({
          statusCode: 403,
          error: "Invalid password",
          data: {},
          message: "",
        });
    }
    const userToken = jwt.sign(userExist, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return res
      .status(200)
      .send({
        statusCode: 200,
        error: "",
        data: {...userExist,userToken},
        message: "logged in",
      });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({
        statusCode: 400,
        error: "probelem while logging in",
        data: {},
        message: "",
      });
  }
};
export const getUserNames = async (req, res) => {
  try {
    const userNames = await userName.find();
    if (!userNames.length) {
      return res.status(400).send({
        statusCode: 403,
        error: "No Usernames exist",
        data: {},
        message: "",
      });
    }
    let userNameCategories = userNames.map((userName) => (userName.category));
    userNameCategories = [...new Set(userNameCategories)].map(userName => ({label:userName,value:userName}))
    return res.status(200).send({
      statusCode: 200,
      error: "",
      data: userNameCategories,
    });
  } catch (err) {
    return res.status(400).send({
      statusCode: 500,
      error: "probelem while getting user names",
      data: {},
      message: "",
    });
  }
};
