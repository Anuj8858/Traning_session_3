// Selectors
const taskInput = document.getElementById('task-input');
const taskDescription = document.getElementById('taskDescription');
const taskDueDate = document.getElementById('taskDueDate');
const addTaskBtn = document.getElementById('add-btn');
const clearTasksBtn = document.querySelector('.clear-tasks');
const searchTasks = document.getElementById('searchTasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let isEditing = false;
let currentEditIndex = null;

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', () => renderTasks(tasks));

// Event Listeners
addTaskBtn.addEventListener('click', addOrEditTask);
clearTasksBtn.addEventListener('click', clearTasks);
searchTasks.addEventListener('input', filterTasks);

document.getElementById('all').addEventListener('click', filterByStatus);
document.getElementById('complete').addEventListener('click', filterByStatus);
document.getElementById('incomplete').addEventListener('click', filterByStatus);

// Functions
function addOrEditTask(event) {
    event.preventDefault();

    // Validate inputs
    const name = taskInput.value.trim();
    const description = taskDescription.value.trim();
    const dueDate = taskDueDate.value;

    if (name === '') {
        alert('Please enter a task name.');
        return;
    }
    if (description === '') {
        alert('Please add Description.');
        return;
    }
    
    if (dueDate === '') {
        alert('Please select a due date.');
        return;
    }
  

    const task = {
        name,
        description,
        dueDate,
        completed: false
    };

    if (isEditing) {
        tasks[currentEditIndex] = task;
        isEditing = false;
        currentEditIndex = null;
        addTaskBtn.textContent = 'Add Task';
        alert('Task edited successfully!');
    } else {
        tasks.push(task);
        alert('Task added successfully!');
    }

    saveTasksToLocalStorage();
    renderTasks(tasks);
    clearInputFields();
}

function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        saveTasksToLocalStorage();
        renderTasks(tasks);
    }
}

function filterTasks() {
    const searchText = searchTasks.value.toLowerCase();
    const filteredTasks = tasks.filter(task => 
        task.name.toLowerCase().includes(searchText)
    );
    renderTasks(filteredTasks);
}

function filterByStatus(event) {
    const status = event.target.value;
    let filteredTasks;

    if (status === 'Complete') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (status === 'Incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else {
        filteredTasks = tasks; // Show all tasks
    }

    renderTasks(filteredTasks);
}

function renderTasks(tasksArray) {
    const taskList = document.getElementById('task-list');
    if (taskList) {
        taskList.remove();
    }

    const ul = document.createElement('ul');
    ul.id = 'task-list';

    tasksArray.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
            <strong class="${task.completed ? 'completed-task' : ''}">${task.name}</strong> - ${task.description} (Due: ${task.dueDate})
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        ul.appendChild(li);
    });

    const container = document.querySelector('.container1');
    container.appendChild(ul);
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks(tasks);
}

function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        renderTasks(tasks);
        alert('Task deleted successfully!');
    }
}

function editTask(index) {
    isEditing = true;
    currentEditIndex = index;

    const task = tasks[index];
    taskInput.value = task.name;
    taskDescription.value = task.description;
    taskDueDate.value = task.dueDate;

    addTaskBtn.textContent = 'Save Changes';
    alert('You can now edit the task!');
}

function clearInputFields() {
    taskInput.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
