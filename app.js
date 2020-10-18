// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

// Functions
function addTodo(e) {
  e.preventDefault();

  // save 
  saveLocalTodos(todoInput.value);

  // div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoInput.value = "";
  todoDiv.appendChild(newTodo);


  // checkmark button
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  todoDiv.appendChild(completedButton);

  // trash button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  todoDiv.appendChild(trashButton);

  // add list to div
  todoList.appendChild(todoDiv);


}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");

    removeLocalTodos(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  })
}

function getTodosFromStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  return todos;
}

function saveLocalTodos(todo) {
  let todos = getTodosFromStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos = getTodosFromStorage();
  const TodoIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(TodoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    // div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoInput.value = "";
    todoDiv.appendChild(newTodo);

    // checkmark button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    todoDiv.appendChild(completedButton);

    // trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    todoDiv.appendChild(trashButton);

    // add list to div
    todoList.appendChild(todoDiv);
  })
}

function checkLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}