const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { constants } = require("../constants");
const jwt=require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(req.body);
    if (!username || !email || !password) {
        const error = new Error("Fields can't be empty");
        error.statusCode = constants.VALIDATION_ERROR;
        throw error;
    }
    
    const userAvailable = await User.findOne({ email });
    
    if (userAvailable) {
        const error = new Error("User already exists");
        error.statusCode = constants.VALIDATION_ERROR;
        throw error;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    
    if(user){
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    }
    else{
        const error = new Error("User data not valid");
        error.statusCode = constants.VALIDATION_ERROR;
        throw error;
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email||!password){
        const error = new Error("All fields are mandatory");
        error.statusCode = constants.VALIDATION_ERROR;
        throw error;
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
    );
        res.status(200).json({accessToken});
    }
    else{
        const error = new Error("Email or password not valid");
        error.statusCode = constants.VALIDATION_ERROR;
        throw error;
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};