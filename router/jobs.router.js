const express = require('express');
const router = express.Router();
const {getAllJobs,getJob,createJob,updateJob,deleteJob} = require('../controller/jobs.controller')

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob);


module.exports = router