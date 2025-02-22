function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    saveTasks();
}

function addTask() {
    let taskText = document.getElementById("taskText").value;
    if (taskText === '') return;

    let task = document.createElement("div");
    task.textContent = taskText;
    task.className = "task";
    task.draggable = true;
    task.id = "task-" + new Date().getTime();
    task.ondragstart = drag;

    document.getElementById("todo").appendChild(task);
    document.getElementById("taskText").value = "";
    saveTasks();
}

function saveTasks() {
    let columns = ["todo", "inprogress", "done"];
    let tasks = {};
    columns.forEach(col => {
        tasks[col] = Array.from(document.getElementById(col).getElementsByClassName("task"))
                          .map(task => task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) return;

    let columns = ["todo", "inprogress", "done"];
    columns.forEach(col => {
        let column = document.getElementById(col);
        column.innerHTML = `<h3>${column.children[0].textContent}</h3>`;
        tasks[col].forEach(text => {
            let task = document.createElement("div");
            task.textContent = text;
            task.className = "task";
            task.draggable = true;
            task.ondragstart = drag;
            column.appendChild(task);
        });
    });
}

function clearTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

window.onload = loadTasks;
