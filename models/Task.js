const mongoose = require('mongoose');
const {Task} = mongoose;

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20,'name cannot be more than 20 chanracter']   
    },
    completed:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model('Task',TaskSchema);
