import { registerUser, loginUser, checkAuthentication, logout } from "./userManagement.js";

console.log('I\'m in');

const tasks = [
    {
        'id' : 1,
        'responsible': 'Mihai',
        'description': 'do the dishes',
        'status': 'pending'
    },
    {
        'id' : 2,
        'responsible': 'Elena',
        'description': 'do homework',
        'status': 'done'
    },
    {
        'id' : 3,
        'responsible': 'Cosmin',
        'description': 'buy Electric Castle tickets',
        'status': 'in progress'
    },
]


function printTasks(tasks) {
    tasks.forEach(element => {
        console.log(`Responsible: ${element.responsible}
Description: ${element.description}
------------------------`)
    });
}

const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const logoutButton = document.getElementById('logout');
const container = document.getElementById('task-container');

if (checkAuthentication()) {
    // User is authenticated
    displayTasks(tasks);
    // Hide the login and registration forms
    registerForm.style.display = 'none';
    loginForm.style.display = 'none';
} else {
    // User is not authenticated
    // Ensure the forms are visible
    registerForm.style.display = 'block';
    loginForm.style.display = 'block';
}

function displayTasks(tasks) {
    if (tasks.length === 0) {
        const noTasksWarning = document.createElement('p');
        noTasksWarning.textContent = 'No tasks available';
        container.appendChild(noTasksWarning);
    } else {
        const taskList = document.createElement('ul');
        tasks.forEach (element => {
            const taskItem = document.createElement('li');

            const taskId = document.createElement('div');
            taskId.textContent = element.id;
            taskItem.appendChild(taskId);

            const taskResponsible = document.createElement('div');
            taskResponsible.textContent = element.responsible;
            taskItem.appendChild(taskResponsible);

            const taskDescription = document.createElement('div');
            taskDescription.textContent = element.description;
            taskItem.appendChild(taskDescription);

            const taskStatus = document.createElement('div');
            taskStatus.textContent = element.status;
            taskItem.appendChild(taskStatus);


            taskList.appendChild(taskItem);
        })
        container.appendChild(taskList);
    }
}

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const user = {}
    user.name = document.getElementById('register-name').value.trim()
    user.email = document.getElementById('register-email').value.trim()
    user.password = document.getElementById('register-password').value.trim()
    
    registerUser(user)
})


// Handle login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    const isAuthenticated = loginUser(email, password);

    if (isAuthenticated) {
        alert('Login successful!');
        logoutButton.style.display = 'block';
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
        displayTasks(tasks);
    } else {
        alert('Invalid email or password.');
        loginForm.reset();
    }
})

logoutButton.addEventListener('click', () => {
    logout();
    logoutButton.style.display = 'none';
    registerForm.style.display = 'block';
    loginForm.style.display = 'block';
    container.style.display = 'none'
})
