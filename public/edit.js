const taskIdDOM = document.querySelector('.task_id');
const taskNameDOM = document.querySelector('.task_name');
const taskStatusDOM = document.querySelector('.task_status');
const taskFormDOM = document.querySelector('.task_edit_form');
const taskEditDOM = document.querySelector('.task_edit_msg');

const urlSearchParams = new URLSearchParams(window.location.search);
const task_id = Object.fromEntries(urlSearchParams.entries()).id; 

const showTask = async() => {
    try {
        const res= await axios.get(`/api/v1/tasks/${task_id}`);
        const task = res.data.task;
        console.log(task);
        taskIdDOM.value = task_id;
        taskNameDOM.value = task.name;
        taskStatusDOM.checked = task.completed;
    } catch (error) {
        console.log(error)
    }
}
showTask();

// Task Edit
taskFormDOM.addEventListener('submit',async(e)=>{
    taskEditDOM.textContent = 'Loading...';
    e.preventDefault();
    try {
        const task_id = taskIdDOM.value;
        const res = await axios.patch(`/api/v1/tasks/${task_id}`,{
            name:taskNameDOM.value,
            completed:taskStatusDOM.checked
        })
        const { _id: taskID, completed, name } = res.data.task;
        console.log(name,completed);

        taskNameDOM.value = name;
        taskStatusDOM.checked = completed;
        taskEditDOM.style.visibility = 'visible';
        taskEditDOM.textContent = 'Task Editted Successfully!';
        taskEditDOM.classList.add('text_success');

    } catch (error) {
        console.log(error);
        taskEditDOM.style.visibility = 'visible';
        taskEditDOM.textContent = 'Some Error Occuerd!!';
        taskEditDOM.classList.add('text_fail');
    }
    });

