const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Function to create task element
function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.textContent = taskText;

    // Add click event to mark task as done/undone
    li.addEventListener("click", function() {
        this.classList.toggle("done");
        updateLocalStorage();
    });

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";

    // Add click event to remove the task
    span.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent li click event from firing
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(span);
    listContainer.appendChild(li);
}

// Function to update localStorage with current tasks
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#list-container li").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add click event to the "Add Task" button
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        createTaskElement(inputBox.value);
        updateLocalStorage();
    }
    inputBox.value = "";
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

