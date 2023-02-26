// const successResponse = (res, _status, message, _data) => {
//     const response = { status: true, message }
//     return res. json(response) ;
// }

const successResponse = (res, _status, message, _data) => {
  const response = { statusCode: 200, message, data: _data };
  return res.status(statusCode).json(response);
};

// TODO: Add error response correctly

const errorResponse = (res, _status, message) => {
  const response = { status: false, message };
  return res.json(response);
};

module.exports = { successResponse, errorResponse };
