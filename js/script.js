//Define UI eLement

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_btn');
let filter = document.querySelector('#filter_task');
let taskInput = document.querySelector('#new_task');


//Add event listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// Define function

//add task
function addTask(e) {
    if(taskInput.value ===''){
       alert('Add a task!');
    } else {
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
        
    }
    e.preventDefault();
}

//Task Remove

function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure?")){
            // console.log(e.target);
            let ele = e.target.parentElement;
            // console.log(ele);
            ele.remove();

            removeFromLs(ele);
        }
    }
}

// Task Clear

function clearTask(e){
    // taskList.innerHTML = '';

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    localStorage.clear();
}

//Filter task

function filterTask(e){
    let text = e.target.value.toLowerCase();

    // console.log(text);
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';

        } else {
            task.style.display = 'none';
        }

    });
}

//Store in localStorage

function  storeTaskInLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

}



//Gets tasks

function getTasks(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.forEach(item => {
    //create li element
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item + " "));
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.innerHTML = 'x';
    li.appendChild(link);
    taskList.appendChild(li);
        });


}


function removeFromLs(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li =  taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}