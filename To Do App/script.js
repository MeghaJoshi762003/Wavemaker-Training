document.addEventListener("DOMContentLoaded", () => {
    let list = document.getElementById("list");
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let modalInstance;

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function onDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.index);
        e.target.classList.add('dragging');
    }

    function onDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function allowDrop(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const fromIndex = e.dataTransfer.getData('text/plain');
        const toIndex = e.target.closest('li')?.dataset.index;

        if (toIndex !== undefined && fromIndex !== toIndex) {
            const movedTask = tasks.splice(fromIndex, 1)[0];
            tasks.splice(toIndex, 0, movedTask);
            saveTask();
            addInList();
        }
    }
    document.getElementById('icon').addEventListener('click', function() {
        if (bg.style.backgroundColor === 'rgb(255, 255, 255)') { // Bootstrap primary color
            bg.style.backgroundColor = 'rgb(0, 0, 0)'; // Bootstrap warning color
            h1.style.color='white'
            icon.style.color='white'
            add.style.color='white'
            select.style.color='white'
            // bg.style.color = 'black';
        } else {
            bg.style.backgroundColor = 'rgb(255, 255, 255)'; // Bootstrap primary color
            // bg.style.color = 'white';
             h1.style.color='black'
            icon.style.color='black'
            add.style.color='black'
            select.style.color='black'
        }
    });

    function addInList() {
        list.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'row h-10';
            li.draggable = true;
            li.dataset.index = index;
            li.innerHTML = `
                <div class="task-text text-success col-4 fs-4">${task.desc}</div>
                <div class="col-4 text-secondary fs-4">Priority: ${task.priority}</div>
                <button type="button" class="btn btn-success btn-sm col-1 m-2 fs-5" data-index="${index}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col-1 m-2 fs-5" data-index="${index}">Delete</button>
            `;
            li.addEventListener('dragstart', onDragStart);
            li.addEventListener('dragend', onDragEnd);
            list.appendChild(li);
        });
    }

    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const dict = {
            desc: document.getElementById('desc').value,
            priority: document.getElementById('floatingSelect').value
        };
        tasks.push(dict);
        saveTask();
        addInList();
        e.target.reset();
    });

    function showEditModal(index) {
        const task = tasks[index];
        document.getElementById('editTaskDesc').value = task.desc;
        document.getElementById('editTaskPriority').value = task.priority;
        document.getElementById('editTaskIndex').value = index;

        const modalElement = document.getElementById('editModal');
        modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
    }

    function saveEditedTask() {
        const index = document.getElementById('editTaskIndex').value;
        const taskDesc = document.getElementById('editTaskDesc').value.trim();
        const taskPriority = document.getElementById('editTaskPriority').value;

        if (taskDesc !== '') {
            tasks[index].desc = taskDesc;
            tasks[index].priority = taskPriority;
            saveTask();
            addInList();
            modalInstance.hide(); // Close the modal
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTask();
        addInList();
    }

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-success')) {
            const index = e.target.dataset.index;
            showEditModal(index);
        } else if (e.target.classList.contains('btn-danger')) {
            const index = e.target.dataset.index;
            deleteTask(index);
        }
    });
    document.getElementById('saveEditBtn').addEventListener('click', () => {
        saveEditedTask();
    });

    list.addEventListener('dragover', allowDrop);
    list.addEventListener('drop', drop);

    addInList();
});
