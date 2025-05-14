const inputTask = document.getElementById('task');
const form = document.getElementById('form');
const divTasks = document.getElementById('tasks');

const tasks = [];

class Task {
    constructor(task, completed) {
        this.task = task;
        this.completed = completed;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (inputTask.value == '') {
        alert('Please enter your task');
    } else {
        const task = new Task(inputTask.value, false);
        tasks.push(task);

        updateTasks();
    }
});

const updateTasks = () => {
    divTasks.innerHTML = '';
    divTasks.classList.remove('hidden');
    tasks.forEach((task, index) => {
        const div = document.createElement('div');
        div.className = 'task';

        const buttonCheck = document.createElement('button');
        buttonCheck.classList.add('check');
        const iCheck = document.createElement('i');
        iCheck.className = 'fa-solid fa-check';
        buttonCheck.appendChild(iCheck);

        buttonCheck.addEventListener('click', () => {
            toggleTaskCompletion(index);
        });

        const p = document.createElement('p');
        p.innerText = `${task.task}`;

        if (task.completed === true) {
            div.style.backgroundColor = 'rgb(112, 247, 112)';
            p.style.color = 'white';
            p.style.textDecoration = 'line-through';
        }

        const buttonTrash = document.createElement('button');
        buttonTrash.classList.add('trash');
        const iTrash = document.createElement('i');
        iTrash.className = 'fa-solid fa-trash';
        buttonTrash.appendChild(iTrash);
        buttonTrash.id = index;

        buttonTrash.addEventListener('click', () => {
            deleteTask(buttonTrash.id);
        });

        div.appendChild(buttonCheck);
        div.appendChild(p);
        div.appendChild(buttonTrash);

        divTasks.appendChild(div);

        inputTask.value = '';
    });

    localStorage.setItem('taskList', JSON.stringify(tasks));
};

const deleteTask = (id) => {
    tasks.splice(id, 1);
    updateTasks();
    if (tasks.length === 0) {
        divTasks.classList.add('hidden');
    }
};

const toggleTaskCompletion = (id) => {
    const task = tasks[id];
    task.completed = !task.completed;

    updateTasks();
};

const reloadPage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('taskList'));
    if (!savedTasks || savedTasks.length === 0) {
        return;
    } else {
        savedTasks.forEach(task => {
            tasks.push(task);
        });
        updateTasks();
    }
};

reloadPage();
