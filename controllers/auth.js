const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const jwt = require("jsonwebtoken")
const {BadRequestError, UnauthenticatedError} = require("../errors");

const register = async (req, res) => {

    const user = await User.create({...req.body})
    // noinspection JSUnresolvedReference
    const token = user.authToken()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token: token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password){
        throw new BadRequestError("provide email")
    }

    const user = await User.findOne({email: email})

    if (!user){
        throw new UnauthenticatedError("user does not exist")
    }
    // noinspection JSUnresolvedReference
    if (!await user.checkPassword(password)){
        throw new UnauthenticatedError("invalid password")
    }
    // noinspection JSUnresolvedReference
    const token = user.authToken()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token: token})
}

module.exports = {register, login}