const express = require("express")

const router = express.Router()

const {getJobs, createJobs, updateJob, deleteJob, getJob}  = require("../controllers/jobs")


router.route("/").post(createJobs).get(getJobs)
router.route("/:id").get(getJob).post(deleteJob).patch(updateJob)



module.exports = router