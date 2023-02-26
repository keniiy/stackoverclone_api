const { generateToken, decodeToken } = require("../helper/jwt");
const { successResponse } = require("../helper/response");
const UserModel = require("../../model/index");

class QuestionManager {
  constructor() {}

  static QuestionResponse = (data) => {
    return {
      grade: data.grade,
      category: data.category,
      question: data.question,
      id: data.id,
    };
  };

  /**
   * @param {string} grade the username of the user
   * @param {string} category the email of the user
   * @param {string} question the password of the user
   */

  static async askQue(data) {
    try {
      const { grade, category, question } = data;

      const { id } = data;
      console.log(grade, category, question);
      const saveQuestion = await UserModel.Question.create({
        grade,
        category,
        question,
        id: data.id,
      });
      return {
        statusCode: 200,
        message: "Successfully Posted question",
        data: saveQuestion,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async allQue(data) {
    try {
      const allQue = await UserModel.Question.find({});

      // TODO: return allQue because it is an array
      if (allQue.length > 0) {
        return {
          statusCode: 200,
          message: "Successfully Fetched All Question",
          data: allQue,
        };
        // successResponse(res, 200, 'No questions available at this time');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async upVoteQue(data) {
    const { id } = data;
    const { user } = data;
    console.log("here");
    try {
      const question = await UserModel.Question.findOne({
        id: id,
        voters: { $all: [user] },
      });
      if (!question) {
        const upVoteQue = await UserModel.Question.findOneAndUpdate(
          { _id: id },
          { $push: { voters: user }, $inc: { vote: 1 } },
          { new: true }
        );
        return {
          statusCode: 200,
          message: "Successfully up voted Question",
          data: upVoteQue,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async downVoteQue(data) {
    const { id } = data;
    const { user } = data;
    try {
      const question = await UserModel.Question.findOne({
        id: id,
        voters: { $all: [user] },
      });

      // Todo: return downVoteQue correct if statement logic
      if (!question) {
        const downVoteQue = await UserModel.Question.findOneAndUpdate(
          { id: id },
          { $pull: { voters: user }, $inc: { vote: -1 } },
          { new: true }
        );
      }
      return {
        statusCode: 200,
        message: "Successfully down voted Question",
        data: downVoteQue,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  static async answerQuestion(data) {
    const { id } = data;
    const { user } = data;
    const { answer } = data;
    try {
      const answeredQuestion = await UserModel.Question.findOneAndUpdate(
        { _id: id },
        {
          $push: { answers: [{ answer: answer, userId: user }] },
        },

        { new: true }
      );
      return {
        statusCode: 200,
        message: "Successfully answered Question",
        data: answeredQuestion,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = QuestionManager;
