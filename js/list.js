let form = document.querySelector('form ')
let textTask = document.querySelector('form input')
let listTask = document.querySelector('.container ul')
let taskNo = document.querySelector('.taskNo')

//====================== 
// createTask.onclick=function(){
// console.log(textTask.value)
// }
//renomeTask()
let tasks = [];

if (localStorage.getItem('task')) {
    tasks = JSON.parse(localStorage.getItem('task'))
}
tasks.forEach(function (item) {
    let cssClass = (item.done) ? 'editTask' : ''

    // tasks.push(item)
    let boksTask = `<li id=${item.id} class="taskList">
    <div class='${cssClass}'> ${item.text}</div>
    <div>
        <button class="yes"></button>
        <button class="no"></button>
    </div>
    
        </li>`;
    if (item.text !== '')
        listTask.insertAdjacentHTML('beforeend', boksTask)

    if (tasks.length > 0)
        taskNo.classList.add('displayNone')


})


// saveDataTask()
form.addEventListener('submit', createNewTask)
function createNewTask(event) {
    event.preventDefault();


    let task = {
        id: Date.now(),
        text: textTask.value,
        done: false,
    }
    let cssClass = (task.done) ? 'editTask' : ''

    tasks.push(task)
    let boksTask = `<li id=${task.id} class="taskList">
    <div class='${cssClass}'> ${task.text}</div>
    <div>
        <button class="yes"></button>
        <button class="no"></button>
    </div>
    
        </li>`
    if (task.text !== '') {
        listTask.insertAdjacentHTML('beforeend', boksTask)
        textTask.value = ''
        textTask.focus()
        if (tasks.length > 0)
            taskNo.classList.add('displayNone')// пройтись по коллекции
        saveDataTask()
    }
}
listTask.addEventListener('click', deleteTask)
function deleteTask(event) {

    if (event.target.closest('.no')) {
        event.target.closest('.taskList').id

        let id = event.target.closest('.taskList').id
        tasks = tasks.filter(function (item) {
            if (item.id !== +id)
                return tasks
            //  console.log(tasks);
        })
        event.target.closest('.taskList').remove()
    }
    if (tasks.length === 0)
        taskNo.classList.remove('displayNone')
    saveDataTask()
}
//==========================
listTask.addEventListener('click', editTask)
function editTask(event) {
    if (event.target.closest('.yes')) {
        let parentNode = event.target.closest('.taskList')
        let id = +parentNode.id;
        tasks.find(function (item) {
            if (item.id === id) {
                item.done = !item.done;
                saveDataTask()
            }

        })
        parentNode.querySelector('div').classList.toggle('editTask')
    }

}
//===============
//===============localStorage
function saveDataTask() {
    localStorage.setItem('task', JSON.stringify(tasks))


}
// function renomeTask() {
//     let localTask = localStorage.getItem('task')
//     listTask.innerHTML = localTask;
// }