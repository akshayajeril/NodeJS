const { CustomAPIError } = require("../error");
const { StatusCodes } = require('http-status-codes');

const errHandler = async (err, req, res, next) => {

    const customErr = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong"
    }
    if(err.code === 11000){
        return res.status(StatusCodes.BAD_REQUEST).send(`Duplicate ${Object.keys(err.keyValue)}`);
    }
    return res.status(customErr.statusCode).json(customErr.message);

}

module.exports = errHandler;