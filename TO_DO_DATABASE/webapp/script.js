

document.addEventListener("DOMContentLoaded", () => {


    let tasks;

    let list = document.getElementById("list");

    let modalInstance;


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

                return b.taskPriority - a.taskPriority;
            } else if (sortBy === 'dateTime') {
                return new Date(b.date) - new Date(a.date);
            }
        });
    }
    function priorityMap(num)
    {
        const priorityMap = {
           1: 'Low',
           2: 'Medium',
           3: 'High'
        };
        return priorityMap[num];
    }


    async function addInList(sortBy = 'priority') {
        const response = await fetch('http://localhost:8080/app/addtask', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  // Properly return the parsed JSON
            })
            .then(data => {
                tasks = data;

                list.innerHTML = '';
                // console.log(tasks);
                const sortedTasks = sortTasks([...tasks], sortBy);
                tasks = sortedTasks
                sortedTasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.className = 'row h-10';
                    li.draggable = true;
                    li.dataset.index = index;
                    li.innerHTML = `
                <div class="task-text text-danger col-5 col-md-3 fs-4">${task.taskDescription}</div>
                <div class="col-5 col-md-5 text-danger fs-5">${priorityMap(task.taskPriority)} ${task.date} ${task.time}</div>
                <i class="btn bi bi-plus-square-fill col-3 col-md-1 fs-5" data-index="${task.id}"></i>
                <button type="button" class="btn btn-success btn-sm col-3 col-md-1 m-1 fs-5 edit" data-index="${task.id}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col-3 col-md-1 m-1 fs-5 delete" data-index="${task.id}">Delete</button>
            `;

                    li.addEventListener('dragstart', onDragStart);
                    li.addEventListener('dragend', onDragEnd);
                    list.appendChild(li);
                });
            })
    }


    document.getElementById("logout").addEventListener("click", (e) => {
            e.preventDefault();

            fetch(`http://localhost:8080/app`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

        });

    document.getElementById("sform").addEventListener("submit",(e)=>{
        e.preventDefault();
        newtask=[]
        const val=document.getElementById('search').value;
        list.innerHTML = '';
        tasks.forEach((task,index)=>{
            if(task.taskDescription.includes(val))
            {
                const li = document.createElement('li');
            li.className = 'row h-10';
            li.draggable = true;
            li.dataset.index = index;
            li.innerHTML = `
                <div class="task-text text-danger col-5 col-md-3 fs-4">${task.taskDescription}</div>
                <div class="col-5 col-md-5 text-danger fs-5">${priorityMap(task.taskPriority)} ${task.date} ${task.time}</div>
                <i class="btn bi bi-plus-square-fill col-3 col-md-1 fs-5" data-index="${index}"></i>
                <button type="button" class="btn btn-success btn-sm col-3 col-md-1 m-1 fs-5 edit" data-index="${index}">Edit</button>
                <button type="button" class="btn btn-danger btn-sm col-3 col-md-1 m-1 fs-5 delete" data-index="${index}">Delete</button>
            `;
            li.addEventListener('dragstart', onDragStart);
            li.addEventListener('dragend', onDragEnd);
            list.appendChild(li);
            }

        })
        e.target.reset();
    })

    document.getElementById("form").addEventListener("submit", (e) => {
        console.log("enter the form");
        e.preventDefault();
        const now=new Date()
        const curr=new Date(
            document.getElementById('date').value + "T" + document.getElementById('time').value
          );
          if (curr <= now) {
            alert("Please enter a date and time that is in the future.");
            return;
          }
        if(!document.getElementById('date').value)
        {
            alert("Enter date");
        }
        else if(!document.getElementById('time').value)
        {
            alert("Enter time");
        }

       else{

           const dict = {
            desc: document.getElementById('desc').value,
            priority: document.getElementById('floatingSelect').value,
            date:document.getElementById('date').value,
            time:document.getElementById('time').value,
            // subtask:[]
        };
        scheduleNotification(dict);
        tasks.push(dict);

        addInList();

        e.target.submit();
        e.target.reset();}
    });

    function showEditModal(index) {
        // const task = tasks[index];
        // document.getElementById('editTaskDesc').value = task.taskDescription;
        // document.getElementById('editTaskPriority').value = task.taskPriority;
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
            const now=new Date()
            const curr=new Date(
                document.getElementById('edate').value + "T" + document.getElementById('etime').value
              );
              if (curr <= now) {
                alert("Please enter a date and time that is in the future.");
                return;
              }
            else if(!document.getElementById('edate').value)
            {
                alert("Enter date");
            }
            else if(!document.getElementById('etime').value)
            {
                alert("Enter time");
            }
            else{
                const date=document.getElementById('edate').value;
                const time=document.getElementById('etime').value
                  fetch(`http://localhost:8080/app/addtask?taskid=${index}&desc=${taskDesc}&priority=${taskPriority}&date=${date}&time=${time}`,{
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                  })
                      .then(response => {
                          return response.json();
                      })
                      .then(data => {
                      })


            addInList();
            modalInstance.hide(); }
        }

    }


    function deleteTask(index) {

        fetch(`http://localhost:8080/app/addtask?id=${index}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
            })

        // saveTask();
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
