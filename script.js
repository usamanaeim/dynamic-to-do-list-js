document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks;
        storedTasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            taskList.removeChild(li);
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        createTaskElement(taskText);
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
