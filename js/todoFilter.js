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
