// Define the UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear all tasks
  clearBtn.addEventListener("click", clearTasks);

  // Filtering the Tasks
  filter.addEventListener("keyup", filterTasks);
}

function getTasks() {
  let tasks = getFromLocalStorage("tasks");

  if (!tasks) {
    tasks = [];
  }

  tasks.forEach((task) => {
    // Create the li element and add
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    // Create a new Link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();

  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create the li element and add
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a new Link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fas fa-times"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Add to the localStorage
  addToLocalStorage("tasks", taskInput.value);

  // Clear the input
  taskInput.value = "";
}

function removeTask(e) {
  // Target the delete link <a> by classList
  const linkElem = e.target.parentElement;

  if (linkElem && linkElem.classList.contains("delete-item")) {
    // Removing the <li> element of the list
    const liElem = e.target.parentElement.parentElement;
    if (liElem) {
      liElem.remove();
      removeFromLocalStorage("tasks", liElem.textContent);
    }
  }
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    }
    
    clearAllFromLocalStorage();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const inputText = e.target.value;
    // Grab the text content of the <li>
    const itemText = task.firstChild.textContent;

    // Does the text match?
    task.style.display =
      itemText.toLowerCase().indexOf(inputText) !== -1 ? "block" : "none";
  });
}

function addToLocalStorage(key, value) {
  let existingItems = getFromLocalStorage(key);

  if (!existingItems) {
    window.localStorage.setItem(key, JSON.stringify([value]));
  } else {
    existingItems.push(value);
    window.localStorage.setItem(key, JSON.stringify(existingItems));
  }
}

function removeFromLocalStorage(key, value) {
  let existingItems = getFromLocalStorage(key);

  if (existingItems) {
    // Removing the Item from array
    existingItems = existingItems.filter((item) => item !== value);
    
    // Re-adding the  to the local storage
    window.localStorage.setItem(key, JSON.stringify(existingItems));
  }
}

function clearAllFromLocalStorage() {
    window.localStorage.setItem('tasks', JSON.stringify([]));
}

function getFromLocalStorage(key) {
  const item = window.localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}
