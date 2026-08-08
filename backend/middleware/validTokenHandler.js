const asyncHandler =require("express-async-handler");
const jwt=require("jsonwebtoken");
const {constants}=require("../constants");
const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error("user not authorized");
        error.statusCode = 401;
        return next(error);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        console.log(decoded);
        return next();
    } catch (err) {
        const error = new Error("user not authorized");
        error.statusCode = 401;
        return next(error);
    }
});
module.exports=validateToken;