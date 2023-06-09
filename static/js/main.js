let taskList = document.querySelector('.parentNode');
let taskTitle = document.querySelector('.taskTitle');
let taskDesc = document.querySelector('.taskDesc');
let taskDate = document.querySelector('.taskDate');
let taskN = document.querySelector('.taskN');

let taskListDone = document.querySelector('.parentNodeDone');
let taskNDone = document.querySelector('.taskNDone');

let taskTemplate = document.querySelector('.taskTemplate')
let btnShowAddTask = document.querySelector('.showAddTask');
let btnCancelAddTask = document.querySelector('.cancelAddTask');
let btnAddTask = document.querySelector('.addTask');
let btnUpdateTask = document.querySelector('.updateTask');

let storage = window.localStorage;

let key;
let keyUpdated;

let timerInterval;

let dateNow = new Date();
dateNow.setHours(0, 0, 0, 0);

Swal.fire({
    title: 'Loading Tasks',
    timer: nLoader(),
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
    },
    willClose: () => {
        clearInterval(timerInterval)
    }
}).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
        taskN.innerHTML = countTask(storage, false);
        taskNDone.innerHTML = countTask(storage, true);
        loadTasks(storage, taskList, taskN, taskListDone, taskNDone);
    }
})


function addTask(){
    task = {
        id: key,
        title: taskTitle.value,
        description: taskDesc.value,
        date: taskDate.value,
        done: false,
    }
    setTask(storage, task);
    loadTask(storage, task, taskList, taskN, taskListDone, taskNDone);
    taskN.innerHTML = countTask(storage, false);
    key++;
    cancelAddTask();
}

function updateTask() {
    task = {
        id: keyUpdated,
        title: taskTitle.value,
        description: taskDesc.value,
        date: taskDate.value,
        done: false,
    }
    setTask(storage, task);
    cancelAddTask();
    clearTasks();
    cal.setEvents();
    loadTasks(storage, taskList, taskN, taskListDone, taskNDone);
}

function showAddTask() {
    btnShowAddTask.style.display = 'none';
    btnCancelAddTask.style.display = 'block';
    btnAddTask.style.display = 'block';
    taskTemplate.style.display = 'flex';
}

function showUpdateTask() {
    btnShowAddTask.style.display = 'none';
    btnCancelAddTask.style.display = 'block';
    btnUpdateTask.style.display = 'block';
    taskTemplate.style.display = 'flex';
}

function cancelAddTask() {
    btnShowAddTask.style.display = 'block';
    btnCancelAddTask.style.display = 'none';
    btnAddTask.style.display = 'none';
    taskTemplate.style.display = 'none';
    btnUpdateTask.style.display = 'none';
    clearField();
}

function clearTasks() {
    let children = taskList.children;
    let childrenDone = taskListDone.children;

    while(children.length > 0){
        taskList.removeChild(children[0]);
    }
    while(childrenDone.length > 0){
        taskListDone.removeChild(childrenDone[0]);
    }
}

function nLoader(){
    if(storage.length === 0){
        return Math.random()*500;
    }
    else if(storage.length <= 5 ){
        return Math.random()*1000;
    }
    else if(storage.length <= 10 ){
        return Math.random()*5000;
    }
    else if(storage.length > 10 ){
        return Math.random()*10000;
    }
}

cal = mobiscroll.eventcalendar('#eventcalendar', {
    theme: 'ios',
    themeVariant: 'light',
});