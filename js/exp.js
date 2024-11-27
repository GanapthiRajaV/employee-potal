let taskList = document.getElementById('task-list');
let addTaskButton = document.getElementById('add-task');
let taskInput = document.getElementById('task');

// Load tasks from Local Storage
loadTasks();

addTaskButton.addEventListener('click', addTask);

function addTask() {
    let task = taskInput.value.trim();
    if (task) {
        let taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span class="task-text">${task}</span>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;
        taskList.appendChild(taskElement);
        taskInput.value = '';
        deleteTask(taskElement);
        editTask(taskElement);
        saveTasks(); // Save tasks to Local Storage
    }
}

function deleteTask(taskElement) {
    let deleteButton = taskElement.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => {
        taskElement.remove();
        saveTasks(); // Save tasks to Local Storage
    });
}

function editTask(taskElement) {
    let editButton = taskElement.querySelector('.edit-task');
    let taskText = taskElement.querySelector('.task-text');
    editButton.addEventListener('click', () => {
        if (editButton.textContent === 'Edit') {
            let inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskText.textContent;
            taskElement.replaceChild(inputField, taskText);
            editButton.textContent = 'Save';
            inputField.focus();
            inputField.addEventListener('blur', () => {
                taskText = document.createElement('span');
                taskText.classList.add('task-text');
                taskText.textContent = inputField.value;
                taskElement.replaceChild(taskText, inputField);
                editButton.textContent = 'Edit';
                saveTasks(); // Save tasks to Local Storage
            });
        } else {
            taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = inputField.value;
            taskElement.replaceChild(taskText, inputField);
            editButton.textContent = 'Edit';
            saveTasks(); // Save tasks to Local Storage
        }
    });
}

function editTask(taskElement) {
    let editButton = taskElement.querySelector('.edit-task');
    let taskText = taskElement.querySelector('.task-text');
    let inputField = null;
    editButton.addEventListener('click', () => {
        if (editButton.textContent === 'Edit') {
            inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = taskText.textContent;
            inputField.style.margin= '10px 0'
            inputField.style.fontSize = '16px';
            taskElement.replaceChild(inputField, taskText);
            editButton.textContent = 'Save';
            editButton.style.background = '#4CAF50';
            editButton.style.color = '#FFFFFF';
            inputField.focus();
        } else {
            taskText = document.createElement('span');
            taskText.classList.add('task-text');
            taskText.textContent = inputField.value;
            taskElement.replaceChild(taskText, inputField);
            editButton.textContent = 'Edit';
            editButton.style.background = '#000';
            editButton.style.color = '#FFFFFF';
            saveTasks(); // Save tasks to Local Storage
        }
    });
}

// Save tasks to Local Storage
function saveTasks() {
    let tasks = [];
    let taskElements = taskList.children;
    for (let i = 0; i < taskElements.length; i++) {
        let taskText = taskElements[i].querySelector('.task-text').textContent;
        tasks.push(taskText);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (let i = 0; i < tasks.length; i++) {
        let taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span class="task-text">${tasks[i]}</span>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;
        taskList.appendChild(taskElement);
        deleteTask(taskElement);
        editTask(taskElement);
    }
}