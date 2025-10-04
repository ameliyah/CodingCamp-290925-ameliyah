// initialize an empty array to hold todo items
let todos = [];

function addTodo() {
    // Get input values
    const todoInput = document.getElementById("todo-inputs");
    const todoDate = document.getElementById("todo-date");

    // Validate input
    if (validateInput(todoInput.value, todoDate.value)) {
        let todo = { task: todoInput.value, date: todoDate.value, status: 'Not Started' };
        todos.push(todo);
        
        // Clear input fields
        todoInput.value = '';
        todoDate.value = '';
        
        // Debugging logs
        console.log('Todo added:', todo);
        console.log('Current todos:', todos);

        // Render the updated todo list
        renderTodo();
    }  
}

function renderTodo(todoArray = todos) {
    // Get the todo list container
    const todoList = document.getElementById('todo-list').getElementsByTagName('tbody')[0];

    // Clear existing list
    todoList.innerHTML = '';

    // Debugging logs
    console.log('Rendering array (length):', todoArray.length);
    console.log('Array contents:', todoArray);

    // Check if there are no todos
    if (todoArray.length === 0) {
        todoList.innerHTML = '<tr><td colspan="4" class="text-center text-gray-500">No todos available. Add one above!</td></tr>';
        return;
    }

    // Render each todo item
    todoArray.forEach((todo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border p-2">${todo.task}</td>
            <td class="border p-2">${todo.date}</td>
            <td class="border p-2">
                <select class="border rounded p-1" onchange="updateStatus(${index}, this)">
                    <option value="Not Started" ${todo.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                    <option value="In Progress" ${todo.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${todo.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td class="border p-2">
                <button onclick="deleteTodo(${index})" class="bg-red-500 text-white p-1 rounded">Delete</button>
            </td>
        `;
        todoList.appendChild(row);
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

function deleteAllTodo() {
    if (confirm('Are you sure you want to delete all todos?')) {
        todos = [];
        renderTodo();
    }
}

function filterTodo() {
    const filterDateInput = document.getElementById("filter-date");
    if (!filterDateInput) {
        alert('Input filter date is not found!');
        return;
    }
    const filterDate = filterDateInput.value;

    console.log('Filtering todos by date:', filterDate);
    console.log('Current todos:', todos);

    if (filterDate === '') {
        console.log('No filter date provided, rendering all todos');
        renderTodo(todos);
        return;
    }

    const filteredTodos = todos.filter(todo => {
        const match = todo.date === filterDate;
        console.log(`Checking todo: "${todo.task}" pada ${todo.date} === ${filterDate} ? Match: ${match}`);
        return match;
    });

    console.log('Filtered todos (length):', filteredTodos.length);
    console.log('Filtered array:', filteredTodos);

    renderTodo(filteredTodos);

    if (filteredTodos.length === 0) {
        alert('No todos found for the selected date.');
    } else {
        alert(`Found ${filteredTodos.length} todo(s) for the selected date.`);
    }
}

function clearFilter() {
    const filterDateInput = document.getElementById('filter-date');
    if (filterDateInput) {
        filterDateInput.value = '';
    }
    renderTodo(todos);
}

function updateStatus(index, selectElement) {
    // Update status based on the selection
    todos[index].status = selectElement.value;
    renderTodo();
}

function validateInput(todo, date) {
    // Check if inputs are empty
    if (todo === '' || date === '') {
        alert('Please enter both a todo and a date.');
        return false;
    }
    return true;
}