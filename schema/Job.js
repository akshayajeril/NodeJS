const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    company : {
        type : String,
        required:[true,"company is required"],
        minlength : 3
    },
    position: {
        type : String,
        required:[true,"Position is required"],
        minlength : 3
    },
    status : {
        type : String,
        enum:['interview','pending','declined'],
        default : 'interview'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    
},{ timestamps: true })

module.exports = mongoose.model('Job',JobSchema)