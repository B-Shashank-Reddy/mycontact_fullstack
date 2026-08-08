const {constants}=require("../constants");
const errorHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode||err.status||500;
    const payload={
        title: err.title || (statusCode===constants.VALIDATION_ERROR ? "VALIDATION ERROR" : statusCode===constants.UNAUTHORIZED ? "UNAUTHORIZED" : statusCode===constants.FORBIDDEN ? "FORBIDDEN" : statusCode===constants.NOT_FOUND ? "NOT FOUND" : "INTERNAL SERVER ERROR"),
        message: err.message || "An unexpected error occurred",
        stackTrace: err.stack
    };

    if (statusCode === constants.VALIDATION_ERROR || statusCode === constants.UNAUTHORIZED || statusCode === constants.FORBIDDEN || statusCode === constants.NOT_FOUND) {
        res.status(statusCode).json(payload);
    } else {
        console.error(err);
        res.status(statusCode).json(payload);
    }
};
module.exports=errorHandler;