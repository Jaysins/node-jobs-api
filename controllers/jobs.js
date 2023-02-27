const Job = require("../models/Job")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")

const getJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    // console.log(jobs)
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const createJobs = async (req, res) => {
    req.body.createdBy = req.user.userId
    const jobs = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({jobs, count: jobs.length})
}
const updateJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}, body: {company, position}} = req
    if (company === "" || company === "") {
        throw new BadRequestError("Empty update")
    }

    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, req.body,
        {new: true, runValidators: true})
    if (!job) {
        throw new NotFoundError("No job with ID")
    }

    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}} = req
    const job = await Job.findOneAndDelete({createdBy: userId, _id: jobId})
    res.status(StatusCodes.OK).json({"status": "Success"})
}
const getJob = async (req, res) => {
    const {user: {userId}, params: {id: jobId}} = req
    const job = await Job.findOne({createdBy: userId, _id: jobId})
    if (!job) {
        throw new NotFoundError("No job with ID")
    }
    res.status(StatusCodes.OK).json({job})

}

module.exports = {getJobs, getJob, deleteJob, createJobs, updateJob}