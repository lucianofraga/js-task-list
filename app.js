// Define the UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All event listeners
loadEventListeners();

function loadEventListeners() {

    form.addEventListener('submit', addTask);
    
}

function addTask(e) {
    e.preventDefault();
    
    if (taskInput.value === '') {
        alert('Add a task')
    }

    // Create the li element and add
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a new Link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Clear the input
    taskInput.value == ''

    console.log(li);
    

    
}