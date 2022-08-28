const loadingDOM = document.querySelector('.loading-text'); 
const tasksDOM = document.querySelector('.tasks');
const formDOM = document.querySelector('.task_form');
const taskInputDOM = document.querySelector('.task_input');
const formAlertDOM = document.querySelector('.form_alert');


const showTasks = async () => {
    try {
      const res = await axios.get('/api/v1/tasks');
      const tasks = res.data.task;
        const allTasks = tasks.map((task) => {
            const {completed, _id:taskId, name} = task;
            return `<div class="single_task">
                <h5 class="${completed && 'task_completed'}"><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                    <!-- edit link -->
                    <a href="task.html?id=${taskId}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <!-- delete btn -->
                    <button type="button" class="delete-btn" data-id="${taskId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`
        }).join('');
        loadingDOM.style.visibility = 'hidden';
        tasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.log(error);
        tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
}
showTasks();


// Task submit
formDOM.addEventListener('submit',async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;
  try {
    await axios.post('/api/v1/tasks/',{name});
    showTasks();
    taskInputDOM.value = '';
    formAlertDOM.style.display='block';
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text_success');
  } catch (error) {
    formAlertDOM.style.display='block';
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(()=>{
    formAlertDOM.style.display='none';
    formAlertDOM.classList.remove('text_success');
  },3000)
})

// Task delete
tasksDOM.addEventListener('click',async(e)=>{
  const e1 = e.target;
  console.log('e1',e1.parentElement);
  if(e1.parentElement.classList.contains('delete-btn')){
    loadingDOM.style.visibility='visible';
    const id = e1.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})
