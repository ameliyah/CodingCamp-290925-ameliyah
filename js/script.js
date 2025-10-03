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
       
       // Clear input fields
       todoInput.value = '';
       todoDate.value = '';
       
       // Debugging logs
       console.log('Todo added:', todo);
       console.log('Current todos:', todos);

       /// Render the updated todo list
       renderTodo();

    }  
}

function renderTodo(todoArray = todos) {
    // Get the todo list container
    const todoList = document.getElementById('todo-list');

    // Clear existing list
    todoList.innerHTML = '';

    // Debugging logs
    console.log('Rendering array (length):', todoArray.length);
    console.log('Array contents:', todoArray);


    // Check if there are no todos
    if (todoArray.length === 0) {
        todoList.innerHTML = '<li class="text-center text-gray-500">No todos available. Add one above!</li>';
        return;
    }

    /// Render each todo item
    todoArray.forEach((todo, index) => {

        const originalIndex = todos.indexOf(todo);
        console.log(`Rendering todo: "${todo.task}" pada ${todo.date} (original index: ${originalIndex})`);
        todoList.innerHTML += `<li class="border p-2 mb-2 flex justify-between items-center">
            <div>
                <p class="font-bold">${todo.task}</p>
                <p class="text-sm text-gray-500">${todo.date}</p>
            </div>
            <button onclick="deleteTodo(${originalIndex})" class="bg-red-500 text-white p-1 rounded">Delete</button>
        </li>`;
    });
}

function deleteTodo(index) {
    // Remove the todo item at the specified index
    if (index >= 0 && index < todos.length) {
        const deleteTodo = todos[index];
        todos.splice(index, 1);

        // Debugging logs
        console.log('Deleted todo:', deleteTodo);
        console.log('Current todos:', todos);

        // Re-render the todo list
        renderTodo();
    }
}
    // Function to delete all todos
function deleteAllTodo() {
    if (confirm('Are you sure you want to delete all todos?')) {
        todos = [];
        renderTodo();
    }
}

// Function to filter todos by date
function filterTodo() {
    const filterDateInput = document.getElementById("filter-date");
    if (!filterDateInput) {
        alert('Input filter date is not found!');
        return;
    }
    const filterDate = filterDateInput.value;

    // Debugging logs
    console.log('Filtering todos by date:', filterDate);
    console.log('Current todos:', todos);


    if (filterDate === '') {
        console.log('no filter date provided, rendering all todos');
        renderTodo(todos)
        return;
    }

    const filteredTodos = todos.filter(todo => {
        const match = todo.date === filterDate;
        console.log(`Checking todo: "${todo.task}" pada ${todo.date} === ${filterDate} ? Match: ${match}`);
        return match;
    })

    console.log('Filtered todos (length):', filteredTodos.length);
    console.log('Filtered array:', filteredTodos);

    renderTodo(filteredTodos);

    //
    if (filteredTodos.length === 0) {
        alert('No todos found for the selected date.');
    } else {
        alert(`Found ${filteredTodos.length} todo(s) for the selected date.`);
    }

}

// Function to clear filter
function clearFilter() {
    const filterDateInput = document.getElementById('filter-date');
    if (filterDateInput) {
        filterDateInput.value = '';
    }
    renderTodo(todos);

}
    

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