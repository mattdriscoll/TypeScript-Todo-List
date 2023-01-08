"use strict";
const todoInput = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const form = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const todos = readTodos();
todos.forEach((todo) => {
    createTodoElement(todo);
});
function readTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos === null)
        return [];
    return JSON.parse(storedTodos);
}
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
        text: todoInput.value,
        completed: false,
    };
    createTodoElement(newTodo);
    todos.push(newTodo);
    saveTodos(todos);
    todoInput.value = "";
};
function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    // console.table(todos);
}
function createTodoElement(todo) {
    const liId = Symbol(todo.text).toString();
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "py-0");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = liId;
    checkbox.classList.add("form-check-input", "me-2", "mt-0");
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", (event) => {
        todo.completed = event.target.checked;
        saveTodos(todos);
    });
    const label = document.createElement("label");
    label.htmlFor = liId;
    label.classList.add("form-check-label", "flex-grow-1", "py-2");
    label.innerText = todo.text;
    li.appendChild(checkbox);
    li.appendChild(label);
    todoList.appendChild(li);
}
form.addEventListener("submit", handleSubmit);
