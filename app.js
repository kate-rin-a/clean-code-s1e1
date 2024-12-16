//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.querySelector(".set__button--add");//first button
var deleteButtons = document.querySelectorAll(".set__button--delete");
var editButtons=document.querySelectorAll(".set__button--edit");
var saveButtons=document.querySelectorAll(".set__button--save");
var incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");
  listItem.className = "set__item set-item";
  //input (checkbox)
  var itemWrapper = document.createElement("div");
  itemWrapper.className = "set__inner-wrapper";
  var checkBox=document.createElement("input");//checkbx
  checkBox.className = "set-item__input set-item__input--checkbox";
  //label
  var label=document.createElement("label");//label
  label.className = "set-item__label";
  //input (text)
  var editInput = document.createElement("input");
  editInput.className = "set-item__input set-item__input--text";

  //button.edit
  var editButton=document.createElement("button");//edit button

  //button.delete
  var deleteButton=document.createElement("button");//delete button
  var deleteButtonImg=document.createElement("img");//delete button image

  label.innerText=taskString;

  //Each elements, needs appending
  checkBox.type="checkbox";
  editInput.type="text";

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.className="set__button set__button--edit edit";

  deleteButton.className="set__button set__button--delete delete";
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.className="delete__log";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.

  itemWrapper.appendChild(checkBox);
  itemWrapper.appendChild(label);
  itemWrapper.appendChild(editInput);
  itemWrapper.appendChild(editButton);
  itemWrapper.appendChild(deleteButton);
  listItem.appendChild(itemWrapper);
  return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";
}

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.closest(".set__item");
  var label=listItem.querySelector(".set-item__label");
  var editInput = listItem.querySelector(".set-item__input--text");
  var editBtn = listItem.querySelector(".set__button--edit");
  var containsClass=listItem.classList.contains("set__item--edit");
    listItem.classList.toggle("set__item--edit");
    if(containsClass) {
      editBtn.innerText = "Edit";
      label.innerText=editInput.value;
    } else {  
      editBtn.innerText = "Save";  
      editInput.value=label.innerText; 
    }
     
};

editButtons.forEach((button) => {
    button.addEventListener("click",editTask);
})

//Delete task.

var deleteTask=function(){
    console.log("Delete Task..."); 
    var listItem=this.closest(".set__item");
    var ul=listItem.parentNode;
      
    ul.removeChild(listItem);
}



//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.closest(".set__item");; //parentNode
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.closest(".set__item");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

deleteButtons.forEach((button) => {
  button.addEventListener("click",deleteTask);
});


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children

    var checkBox=taskListItem.querySelector(".set-item__input--checkbox");
    var editButton=taskListItem.querySelector(".set__button--edit");
    var deleteButton=taskListItem.querySelector(".set__button--delete");
    editButton.addEventListener("click", editTask);
    deleteButton.addEventListener("click", deleteTask);

    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.