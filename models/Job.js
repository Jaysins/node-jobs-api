const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Required"],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, "Required"],
        maxlength: 200

    },
    status: {
        type: String,
        required: [true, "Required"],
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, "Required"]
    }

}, {timestamps: true})

module.exports = mongoose.model("Job", JobSchema)
