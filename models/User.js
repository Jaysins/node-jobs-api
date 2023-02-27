const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs")
const {func} = require("joi");


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "required"],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "required"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "required"]
    }
})

UserSchema.pre("save", async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.authToken = function (){
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN})
}

UserSchema.methods.checkPassword = function (password){
    return bcrypt.compare(password, this.password)
}
module.exports = mongoose.model("User", UserSchema)
