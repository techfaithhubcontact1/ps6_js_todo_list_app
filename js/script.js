// dom elements selection
const taskInputElm = document.querySelector("#task_input");
const tasksListElm = document.querySelector(".tasksListElm");
const [allTasksElm, actTasksElm, compTasksElm] = document.querySelectorAll(".filters span");
const editBtn = document.querySelector(".edit_btn");
const saveBtn = document.querySelector(".save_btn");

// to do tasks empty array
let tasksListArr = [];
let liElm;

// get locale storage data
let lStoreTodoTasks = JSON.parse(localStorage.getItem("tasksListArr"));
if(lStoreTodoTasks !== null){
     tasksListArr = lStoreTodoTasks;
     renderTasks();
};

// tasks save and include is array 
function saveTask(){
     let taskName = taskInputElm.value;
     let taskObj = {
          taskName: taskName,
          taskId: tasksListArr.length+1,
          isCheck: false,
     }
     if(taskInputElm.value != ""){
          tasksListArr.push(taskObj);
          renderTasks();
          localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
     };
     taskInputElm.value = "";
};

// tasks input rendered on dom
function renderTasks(){
     tasksListElm.innerHTML = "";
     tasksListArr.map((task, idx)=>{
          liElm = `
               <li>
                    <input type="checkbox" class="check_box" title="Check Uncheck" onclick="checkUncheck(${idx}, this)" ${task.isCheck?'checked':""}>
                    <p>${idx+1}. ${task.taskName}</p>
                    <div class="actions">
                         <button title="editTask" onclick="editFunc(${idx})"><i class="fa fa-pencil-square"></i></button>
                         <button title="deleteTask" onclick="delFunc(${idx})"><i class="fa fa-trash"></i></button>
                    </div>
               </li>
          `; 
          tasksListElm.innerHTML += liElm;
     });
     if(tasksListArr.length >= 9){
          document.body.classList.add("body_height")
     };
};

// check uncheck 
function checkUncheck(elmIdx, elm) {
     let isCh = elm.checked;
     let idx = tasksListArr.findIndex(ts=>ts.taskId == elmIdx+1); console.log("idx..", idx);
     tasksListArr[idx].isCheck = isCh;
     localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
};

// edit functionalities 
let editElmIdx = 0;
function editFunc(elmIdx) {
     let idx = tasksListArr.findIndex(ts=>ts.taskId == elmIdx+1);
     taskInputElm.value = tasksListArr[idx].taskName;
     saveBtn.classList.add("hide");
     editBtn.classList.remove("hide");
     editElmIdx = elmIdx+1;
};

editBtn.addEventListener("click", ()=>{
     let idx = tasksListArr.findIndex(ts=>ts.taskId == editElmIdx);
     tasksListArr[idx].taskName = taskInputElm.value;
     saveBtn.classList.remove("hide");
     editBtn.classList.add("hide");
     renderTasks();
     localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
     taskInputElm.value = "";
});

// delete logics
function delFunc(elmIdx) {
     let idx = tasksListArr.findIndex(ts=> ts.taskId == elmIdx+1);
     tasksListArr.splice(idx, 1)
     renderTasks();
     localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
};

function delAllTasks() {
     tasksListArr.splice(0)
     renderTasks();
     localStorage.setItem("tasksListArr", JSON.stringify(tasksListArr));
};

// filter logics
allTasksElm.addEventListener("click", (e)=>{
     tasksListArr = lStoreTodoTasks.filter(ts=>ts);
     renderTasks();
     e.target.classList.add("active");
     actTasksElm.classList.remove("active");
     compTasksElm.classList.remove("active");
});
actTasksElm.addEventListener("click", (e)=>{
     tasksListArr = lStoreTodoTasks.filter(ts=>ts.isCheck == false);
     renderTasks();
     e.target.classList.add("active");
     allTasksElm.classList.remove("active");
     compTasksElm.classList.remove("active");
});
compTasksElm.addEventListener("click", (e)=>{
     tasksListArr = lStoreTodoTasks.filter(ts=>ts.isCheck == true); 
     renderTasks();
     e.target.classList.add("active");
     allTasksElm.classList.remove("active");
     actTasksElm.classList.remove("active");
});