const { StatusCodes } = require('http-status-codes');
const {BadRequestError} = require('../error');
const {NotFoundError} = require('../error');
const Job = require('../schema/Job')

const getAllJobs = async (req,res) => {
    const job = await Job.find({createdBy: req.user.userId});
    if(!job.length){
        throw new NotFoundError("No Jobs in list");
    }
    res.status(StatusCodes.OK).json(job)
}
const getJob = async (req,res) => {
   
    const id = req.params.id;
    const job = await Job.findOne({_id: id, createdBy: req.user.userId})
    if(!job){
        throw new NotFoundError("Job not found");
    }
    res.status(StatusCodes.OK).json(job)
}
const createJob = async (req,res) => {
    const {company,position} = req.body;
    if(!company || !position){
        throw new BadRequestError("Invalid credentials");
    }
   
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body)

    res.status(StatusCodes.OK).json(job)
}
const updateJob = async (req,res) => {
    const id = req.params.id;
    const job = await Job.findOneAndUpdate({_id: id, createdBy: req.user.userId},req.body)
    res.status(StatusCodes.OK).json({"message":`Job ${id} is updated`})
}
const deleteJob = async (req,res) => {
    const {id} = req.params.id;
    const job = await Job.findOneAndDelete({_id: id, createdBy: req.user.userId},req.body)
    res.status(StatusCodes.OK).json({"message":`Job ${id} is deleted`})
}

module.exports = {
    getAllJobs,getJob,createJob,updateJob,deleteJob
}