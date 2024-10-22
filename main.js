import { registerUser, loginUser, checkAuthentication, logout } from "./userManagement.js";
import { editTask, deleteTask } from "./tasksManagement.js"

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
    logoutButton.style.display = 'block';
} else {
    // User is not authenticated
    // Ensure the forms are visible
    registerForm.style.display = 'block';
    loginForm.style.display = 'block';
    logoutButton.style.display = 'none';
}

function displayTasks(tasks) {
    container.innerHTML='';
    container.style.display = 'block';

    if (tasks.length === 0) {
        const noTasksWarning = document.createElement('p');
        noTasksWarning.textContent = 'No tasks available';
        container.appendChild(noTasksWarning);
    } else {
        const taskList = document.createElement('ul');
        tasks.forEach(element => {
            const taskItem = document.createElement('li');
            taskItem.style.display = 'flex';
            taskItem.style.flexWrap = 'wrap';
            taskItem.style.marginBottom = '10px';

            // Create a container div for the task details
            const taskDetails = document.createElement('div');
            taskDetails.style.display = 'flex';
            taskDetails.style.flexDirection = 'row';
            taskDetails.style.width = '100%';

            const taskId = document.createElement('div');
            taskId.textContent = 'ID: ' + element.id;
            taskId.style.width = '50px'; // Fixed width
            taskDetails.appendChild(taskId);

            const taskResponsible = document.createElement('div');
            taskResponsible.textContent = 'Responsible: ' + element.responsible;
            taskResponsible.style.width = '150px'; // Fixed width
            taskDetails.appendChild(taskResponsible);

            const taskDescription = document.createElement('div');
            taskDescription.textContent = 'Description: ' + element.description;
            taskDescription.style.width = '200px'; // Fixed width
            taskDetails.appendChild(taskDescription);

            const taskStatus = document.createElement('div');
            taskStatus.textContent = 'Status: ' + element.status;
            taskStatus.style.width = '100px'; // Fixed width
            taskDetails.appendChild(taskStatus);

            taskItem.appendChild(taskDetails);
            
            let username = localStorage.getItem('username') || ''

            // If the logged-in user is responsible for the task, add edit and delete buttons
            if (checkAuthentication() && element.responsible === username) {
                // Create a container div for the buttons
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.flexDirection = 'row';
                buttonContainer.style.marginTop = '5px';

                // Create Edit button
                const editButton = document.createElement('button');
                editButton.id = 'edit' + element.id;
                editButton.textContent = 'Edit';
                editButton.style.marginRight = '5px';
                buttonContainer.appendChild(editButton);

                // Add event listener to Edit button
                editButton.addEventListener('click', () => editTask(element.id));

                // Create Delete button
                const deleteButton = document.createElement('button');
                deleteButton.id = 'delete' + element.id;
                deleteButton.textContent = 'Delete';
                buttonContainer.appendChild(deleteButton);

                // Add event listener to Delete button
                deleteButton.addEventListener('click', () => deleteTask(element.id));

                taskItem.appendChild(buttonContainer);
            }

            taskList.appendChild(taskItem);
        });
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
        displayTasks(tasks);
        logoutButton.style.display = 'block';
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
    } else {
        alert('Invalid email or password.');
        loginForm.reset();
    }
})

logoutButton.addEventListener('click', () => {
    logout();
    registerForm.style.display = 'block';
    loginForm.style.display = 'block';
    container.style.display = 'none'
    logoutButton.style.display = 'none';
})