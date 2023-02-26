const bcrypt = require("bcryptjs");
const jwt = ({ generateToken, decodeToken } = require("../helper/jwt"));
const { successResponse, errorResponse } = require("../helper/response");
const UserModel = require("../../model/index");

class UserManager {
  constructor() {}

  static userResponse = (data) => {
    return {
      email: data.email,
      username: data.username,
      // id: data.id,
    };
  };

  /**
   * @param {string} username the username of the user
   * @param {string} email the email of the user
   * @param {string} password the password of the user
   */

  static async register(data) {
    try {
      const { email, firstName, lastName, password } = data;

      // check if user already exists

      //   const user = await UserModel.findOne({
      //     $or: [
      //       { email: email },
      //       { username: userName},
      //     ],
      //   });

      //   if (user)
      //     return {
      //       statusCode: 400,
      //       message: "User already exists",
      //     };

      const hashPassword = await bcrypt.hashSync(password, 10);

      const createUser = await UserModel.User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword,
      });

      return {
        statusCode: 200,
        message: "User created successfully",
        data: await UserManager.userResponse(createUser),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - This method is used to login a user
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async login(data) {
    const { email, password } = data;
    const user = await UserModel.User.findOne({ email: email });
    if (!user)
      return {
        statusCode: 404,
        message: "User not found",
      };

    //TODO: Uncomment this when you are done with the login

    // const isPasswordValid = await bcrypt.compareSync(password, user.password);
    // if (isPasswordValid)
    //   return {
    //     statusCode: 401,
    //     message: "Invalid password",
    //   };

    const token = await jwt.generateToken();

    return {
      statusCode: 200,
      message: {
        "Login successful": token,
      },
      data: { user: await UserManager.userResponse(user) },
    };
  }
}
module.exports = UserManager;
