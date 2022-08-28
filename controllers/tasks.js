const Task = require('../models/Task');

const getAllTasks = async (req,res) => {
    try {
        const task = await Task.find({});
        res.status(200).json({task});   
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const getSingleTask = async (req,res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findById({_id:taskId});
        res.status(201).json({task});   
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

/* Below 'new:true' -> this means once task is updated in response it will provide updated task and not 
old task. 
 'runValidators:true' -> it will make sure the validation we have added to our schema will be 
 applied by default it is does not take validations. */

const updateTask = async (req,res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate({_id:taskId},req.body,{
        new:true,
        runValidators:true
        });
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskId}`});
        }
        res.status(200).json({task,msg:'task updated'})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deleteTask = async (req,res) => {
    try {
        const taskId = req.params.id;
        const task = await Task.findOneAndDelete({_id:taskId});
        res.status(200).json({task,msg:'task deleted'});    
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllTasks,getSingleTask,createTask,updateTask,deleteTask
}