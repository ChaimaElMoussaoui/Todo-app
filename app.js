document.getElementById('add-button').addEventListener('click', () => {
    console.log('ADD button clicked');
    addTodoItem();
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');
    addTodoItem();
});

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const category = event.target.getAttribute('data-category');
        console.log('Category selected:', category);
        filterByCategory(category);
    });
});

let currentCategory = 'work';

function addTodoItem() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        console.log('Input is empty');
        return;
    }

    console.log('Adding todo:', todoText);

    const newTodo = {
        text: todoText,
        completed: false,
        category: currentCategory
    };

    allTodos.push(newTodo);
    saveTodos();
    updateTodoList();

    todoInput.value = ''; 
}

function updateTodoList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; 

    allTodos.forEach((todo, index) => {
        if (todo.category === currentCategory) {
            const todoLI = createTodoElement(todo, index);
            todoList.appendChild(todoLI);
        }
    });
}

function createTodoElement(todo, index) {
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

    // **Nieuw: Voeg categorie toe**
    const categorySpan = document.createElement('span');
    categorySpan.classList.add('todo-category');
    categorySpan.textContent = ` (${todo.category})`;
    categorySpan.style.marginLeft = '10px';
    categorySpan.style.fontStyle = 'italic';
    categorySpan.style.backgroundColor = getCategoryColor(todo.category);
    categorySpan.style.borderColor = getCategoryColor(todo.category);

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
    todoLI.appendChild(categorySpan); // Voeg de categorie toe
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
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        allTodos = savedTodos;
    }
}

function getTodos() {
    const todos = localStorage.getItem('todos') || '[]';
    console.log('Todos loaded:', todos);
    return JSON.parse(todos);
}

document.getElementById('filter-all').addEventListener('click', () => {
    console.log('Filter: All');
    filterTodos('all');
});

document.getElementById('filter-complete').addEventListener('click', () => {
    console.log('Filter: Complete');
    filterTodos('complete');
});

document.getElementById('filter-uncomplete').addEventListener('click', () => {
    console.log('Filter: Uncomplete');
    filterTodos('uncomplete');
});

function filterTodos(filter) {
    console.log('Filtering todos:', filter);
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        const isChecked = todo.querySelector('input[type="checkbox"]').checked;
        if (filter === 'all') {
            todo.style.display = 'flex';
        } else if (filter === 'complete' && isChecked) {
            todo.style.display = 'flex';
        } else if (filter === 'uncomplete' && !isChecked) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
}

function filterByCategory(category) {
    currentCategory = category;
    updateTodoList();
}


const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('darkMode');
    localStorage.setItem('darkMode', isDarkMode);
});

function renderTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('darkMode');
    }
}

renderTheme();


let allTodos = [];

updateTodoList();

const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('darkMode');
});

function getCategoryColor(category) {
    switch (category) {
        case 'work':
            return 'blue';
        case 'personal':
            return 'green';
        case 'shopping':
            return 'orange';
        case 'others':
            return 'gray';
        default:
            return 'black';
    }
}