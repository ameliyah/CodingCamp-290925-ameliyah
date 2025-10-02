// initialize an empty array to hold todo items
let todos = [];

function addTodo() {
    // Get input values
    const todoInput = document.getElementById("todo-inputs");
    const todoDate = document.getElementById("todo-date");

    // Validate input
    if (validateInput(todoInput.value, todoDate.value)) {
       let todo = { task: todoInput.value, date: todoDate.value };
       todos.push(todo);
       
       /// Render the updated todo list
       renderTodo();

    }  
}

function renderTodo() {
    // Get the todo list container
    const todoList = document.getElementById('todo-list');

    // Clear existing list
    todoList.innerHTML = '';

    /// Render each todo item
    todos.forEach((todo, index) => {
        todoList.innerHTML += `<li class="border p-2 mb-2 flex justify-between items-center">
            <div>
                <p class="font-bold">${todo.task}</p>
                <p class="text-sm text-gray-500">${todo.date}</p>
            </div>
            <button onclick="deleteTodo(${index})" class="bg-red-500 text-white p-1 rounded">Delete</button>
        </li>`;
    });
}

function deleteTodo() {
    // Clear the todo array
    todos = [];
    
    // Re-render the empty todo list
    renderTodo();

}

function filterTodo() {}

// Validation input function
function validateInput(todo, date) {
    // Check if inputs are empty
    if (todo === '' || date === '') {
        // show an alert if validation fails
        alert('Please enter both a todo and a date.');
        return false;
    }
    // input is valid
    return true;
}