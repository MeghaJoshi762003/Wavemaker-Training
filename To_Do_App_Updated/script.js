
document.addEventListener("DOMContentLoaded", () => {
    
    function deleteSubTask(index,i){  
        tasks[index].subtask.splice(i,1);
        saveTask()
        addInList();
     }
    let list = document.getElementById("list");
    let tasks = JSON.parse(localStorage.getItem('newtasks')) || [];
    let modalInstance;
   
    function saveTask() {
        localStorage.setItem('newtasks', JSON.stringify(tasks));
    }

    function onDragStart(e) {
        e.dataTransfer.setData('text');
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
        const fromIndex = e.dataTransfer.getData('text');
        const toIndex = e.target.closest('li')?.dataset.index;

        if (toIndex !== undefined && fromIndex !== toIndex) {
            const movedTask = tasks.splice(fromIndex, 1)[0];
            tasks.splice(toIndex, 0, movedTask);
            saveTask();
            addInList();
        }
    }
    document.getElementById('icon').addEventListener('click', function() {
        if (bg.style.backgroundColor === 'rgb(255, 255, 255)') { 
            bg.style.backgroundColor = 'rgb(0, 0, 0)'; 
            h1.style.color='white'
            icon.style.color='white'
            add.style.color='white'
            select.style.color='white' 
            sortBy.style.color='white'  
        } else {
            bg.style.backgroundColor = 'rgb(255, 255, 255)'; 
            h1.style.color='black'
            icon.style.color='black'
            add.style.color='black'
            select.style.color='black'
            sortBy.style.color='black'
        }
    });
    
    function sortTasks(tasks, sortBy) {
        
        return tasks.sort((a, b) => {
            if (sortBy === 'priority') {
                const priorityMap = {
                    'Low': 1,
                    'Medium': 2,
                    'High': 3
                };
                return priorityMap[b.priority] - priorityMap[a.priority];
            } else if (sortBy === 'dateTime') {
                return new Date(b.date) - new Date(a.date);
            }
        });
    }
    

    function addInList(sortBy = 'priority') {
        list.innerHTML = '';

        const sortedTasks = sortTasks([...tasks], sortBy);
        tasks=sortedTasks
        sortedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'row h-10';
            li.draggable = true;
            li.dataset.index = index;
            li.innerHTML = `
                <div class="task-text text-danger col-5 col-md-3 fs-4">${task.desc}</div>
                <div class="col-5 col-md-5 text-danger fs-5">${task.priority} ${task.date} ${task.time}</div>
                <i class="btn bi bi-plus-square-fill col-3 col-md-1 fs-5" data-index="${index}"></i>
                <button type="button" class="btn btn-success btn-sm col-3 col-md-1 m-1 fs-5 edit" data-index="${index}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col-3 col-md-1 m-1 fs-5 delete" data-index="${index}">Delete</button>
            `;

            const sub=task.subtask;
            const sortedSubTask=sortTasks([...sub], sortBy);
            task.subtask=sortedSubTask
            sortedSubTask.forEach((subTask,i)=>{
                        const innerli=document.createElement('li');
                        innerli.className = 'row h-5 p-md-3 ';
                        innerli.dataset.index=i;
                        
                        innerli.innerHTML=
                        `
                        <div class="task-text text-success col-5 col-md-3 fs-5">${subTask.desc}</div>
                        <div class="col-5 col-md-5 text-success fs-6">${task.priority} ${subTask.date} ${task.time}</div>
                        <button type="button" value="${index}" class="btn btn-success btn-sm col-3 col-md-1 m-1 fs-6 sedit" data-index="${i}">Edit</button>
                        <button type="button" value="${index}"class="btn btn-danger btn-sm col-3 col-md-1  m-1 fs-6 sdelete" data-index="${i}">Delete</button>
                    `;
                    li.appendChild(innerli);
                    })

            li.addEventListener('dragstart', onDragStart);
            li.addEventListener('dragend', onDragEnd);
            list.appendChild(li);
        });
    }
 

    document.getElementById("sform").addEventListener("submit",(e)=>{
        e.preventDefault();
        newtask=[]
        const val=document.getElementById('search').value;
        list.innerHTML = '';
        tasks.forEach((task,index)=>{
            if(task.desc.includes(val))
            {
                const li = document.createElement('li');
            li.className = 'row h-10';
            li.draggable = true;
            li.dataset.index = index;
            li.innerHTML = `
                <div class="task-text text-danger col-5 col-md-3 fs-4">${task.desc}</div>
                <div class="col-5 col-md-5 text-danger fs-5">${task.priority} ${task.date} ${task.time}</div>
                <i class="btn bi bi-plus-square-fill col-3 col-md-1 fs-5" data-index="${index}"></i>
                <button type="button" class="btn btn-success btn-sm col-3 col-md-1 m-1 fs-5 edit" data-index="${index}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col-3 col-md-1 m-1 fs-5 delete" data-index="${index}">Delete</button>
            `;
            li.addEventListener('dragstart', onDragStart);
            li.addEventListener('dragend', onDragEnd);
            list.appendChild(li);
            }
            const sub=task.subtask;
                    sub.forEach((subTask,i)=>{
                        if(subTask.desc.includes(val)){
                        const innerli=document.createElement('li');
                        innerli.className = 'row h-5 p-3';
                        innerli.dataset.index=i;
                        
                        innerli.innerHTML=
                        `
                        <div class="task-text text-success col-5 col-md-3 fs-5">${subTask.desc}</div>
                        <div class="col-5 col-md-5 text-success fs-6">${task.priority} ${subTask.date} ${task.time}</div>
                        <button type="button" value="${index}" class="btn btn-success btn-sm col-3 col-md-1 m-1 fs-6 sedit" data-index="${i}">Edit</button>
                        <button type="button" value="${index}"class="btn btn-danger btn-sm col-3 col-md-1  m-1 fs-6 sdelete" data-index="${i}">Delete</button>
                    `;
                    list.appendChild(innerli);
                        }
                    })
        })
        e.target.reset();
    })

    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const dict = {
            desc: document.getElementById('desc').value,
            priority: document.getElementById('floatingSelect').value,
            date:document.getElementById('date').value,
            time:document.getElementById('time').value,
            subtask:[]
        };
        scheduleNotification(dict);
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
    function addSubtask(index){ 
        document.getElementById('editTaskIx').value = index;
        const modalElement = document.getElementById('editSub');
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
            tasks[index].date=document.getElementById('edate').value;
            tasks[index].time=document.getElementById('etime').value;
            saveTask();
            addInList();
            modalInstance.hide(); 
        }
        
    }
     function saveSubTask(){
        const index = document.getElementById('editTaskIx').value;
        const taskDesc = document.getElementById('TaskDesc').value.trim();
        const taskPriority = document.getElementById('TaskPriority').value;
        const time=document.getElementById('stime').value;
        const date=document.getElementById('sdate').value;
        dict={
            desc:taskDesc,
            date:date,
            time:time,
            priority:taskPriority
        }
        tasks[index].subtask.push(dict);
        saveTask();
        addInList();
        modalInstance.hide();
        scheduleNotification(dict);

     }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTask();
        addInList();
    }

    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')  ) {
            const index = e.target.dataset.index;
            showEditModal(index);
        } else if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            deleteTask(index);
        }
        else if(e.target.classList.contains('bi-plus-square-fill')){
            const index = e.target.dataset.index;
            addSubtask(index);
        }
        else if (e.target.classList.contains('sdelete')) {
            
            const parentIndex = e.target.value;
            const subIndex = e.target.dataset.index;
            deleteSubTask(parentIndex, subIndex);
        }
        else if(e.target.classList.contains('sedit'))
        {
            const parentIndex = e.target.value;
            const subIndex = e.target.dataset.index;
            showSubEdit(parentIndex,subIndex);
        }
    });
    function showSubEdit(parentIndex,childIndex){
      
        document.getElementById('subIx').value = childIndex;
        document.getElementById('parentIx').value = parentIndex;
        document.getElementById('TaskDes').value = tasks[parentIndex].subtask[childIndex].desc;

        const modalElement = document.getElementById('editSubTask');
        modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show(); 
    }
    document.getElementById('saveEditBtn').addEventListener('click', () => {
        saveEditedTask();
    });
    document.getElementById('saveEditTask').addEventListener('click', () => {
        saveSubTask();
    });
    document.getElementById('savechangedtask').addEventListener('click',()=>{
        const cindex=document.getElementById('subIx').value;
        const pindex=document.getElementById('parentIx').value;
        tasks[pindex].subtask[cindex].desc=document.getElementById('TaskDes').value;
        tasks[pindex].subtask[cindex].priority=document.getElementById('taskPriority').value;
        tasks[pindex].subtask[cindex].date=document.getElementById('subdate').value;
        tasks[pindex].subtask[cindex].time=document.getElementById('subtime').value;
        saveTask();
        addInList();
        modalInstance.hide();


    })
    
    document.getElementById('sortOption').addEventListener('change', (e) => {
        addInList(e.target.value);

    });
document.getElementById("export").addEventListener('click',(e)=>{
    const blob = new Blob([JSON.stringify(tasks)],
     { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
    URL.revokeObjectURL(url);
}
)
document.getElementById("import").addEventListener('click', () => {
    document.getElementById("fileInput").click();
});

document.getElementById("fileInput").addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = (event) => {
                const data = JSON.parse(event.target.result);
                
                tasks = tasks.concat(data);
            addInList();
            saveTask()
        };
        reader.readAsText(file);
    } 
});
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
function sendNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body });
    }
}

function scheduleNotification(task) {
    const now = new Date();
    const dueTime = new Date(task.date); 
    const [hours, minutes] = task.time.split(':').map(Number);
    dueTime.setHours(hours);
    dueTime.setMinutes(minutes);
    dueTime.setSeconds(0);
    dueTime.setMilliseconds(0); 
    const timeToWait = dueTime - now;
    if (timeToWait > 0) {
        setTimeout(() => {
            sendNotification('Task Due', `Reminder: ${task.desc} is due now.`);
        
        }, timeToWait);
    } 
}

list.addEventListener('dragover', allowDrop);
list.addEventListener('drop', drop);


addInList();

    
});
