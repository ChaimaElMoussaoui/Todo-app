import alertManager from "./alertManager.js";

let allTodos = getTodos();

document.getElementById('add-button').addEventListener('click', () => {
    console.log('ADD button clicked');
    addTodoItem();
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');
    addTodoItem();
});

function addTodoItem() {
    const todoInput = document.getElementById('todo-input');
    const category = document.getElementById('category-dropdown').value;
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alertManager.showAlert('Enter a todo', 'danger');
        return;
    }

    if (category === 'all') {
        alertManager.showAlert('Select a category', 'danger');
        return;
    }

    console.log('Adding todo:', todoText);

    const newTodo = {
        text: todoText,
        completed: false,
        category: category
    };

    allTodos.push(newTodo);
    saveTodos();
    updateTodoList();

    todoInput.value = '';

    alertManager.showAlert('Todo added', 'success');
}


function updateTodoList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    allTodos.forEach((todo, index) => {
        const todoLI = createTodoElement(todo, index, todo.category ?? "UNKNOWN");
        todoList.appendChild(todoLI);
    });
}


function createTodoElement(todo, index, category) {
    const todoLI = document.createElement('li');
    todoLI.classList.add('todo');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `todo-${index}`;
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });

    const customCheckbox = document.createElement('label');
    customCheckbox.classList.add('custom-checkbox');
    customCheckbox.setAttribute('for', `todo-${index}`);
    customCheckbox.innerHTML = `
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
        </svg>
    `;

    const todoText = document.createElement('label');
    todoText.setAttribute('for', `todo-${index}`);
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;

    const todoCategory = document.createElement('label');
    todoCategory.setAttribute('for', `todo-${category}`);
    todoCategory.classList.add('todo-category');
    todoCategory.textContent = category;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = `
        <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>
    `;
    deleteButton.addEventListener('click', () => {
        console.log('Deleting todo:', index);
        deleteTodoItem(index);
    });

    todoLI.appendChild(checkbox);
    todoLI.appendChild(customCheckbox);
    todoLI.appendChild(todoText);
    todoLI.appendChild(todoCategory);
    todoLI.appendChild(deleteButton);

    return todoLI;
}

function deleteTodoItem(todoIndex) {
    const todoItem = document.querySelector(`#todo-${todoIndex}`).closest('.todo');
    todoItem.classList.add('removing');
    todoItem.addEventListener('animationend', () => {
        allTodos = allTodos.filter((_, i) => i !== todoIndex);
        saveTodos();
        updateTodoList();
    });
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todosJson);
    console.log('Todos saved:', todosJson);
}

function getTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    console.log('Todos loaded:', todos);
    return JSON.parse(todos);
}

updateTodoList();