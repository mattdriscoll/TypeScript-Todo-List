interface Todo {
  text: string;
  completed: boolean;
}

const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const button = document.getElementById("add-button");
const form = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const todos: Todo[] = readTodos();

todos.forEach((todo) => {
  createTodoElement(todo);
});

function readTodos(): Todo[] {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos === null) return [];
  return JSON.parse(storedTodos);
}

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const newTodo: Todo = {
    text: todoInput.value,
    completed: false,
  };

  createTodoElement(newTodo);
  todos.push(newTodo);

  saveTodos(todos);

  todoInput.value = "";
};

function saveTodos(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
  // console.table(todos);
}

function createTodoElement(todo: Todo) {
  const liId = Symbol(todo.text).toString();
  const li = document.createElement("li");
  const liClassList = [
    "list-group-item",
    "d-flex",
    "align-items-center",
    "py-0",
  ];
  li.classList.add(...liClassList);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = liId;
  const checkboxClassList = ["form-check-input", "me-2", "mt-0"];
  checkbox.classList.add(...checkboxClassList);
  checkbox.checked = todo.completed;

  checkbox.addEventListener("change", (event) => {
    todo.completed = (event.target as HTMLInputElement).checked;
    saveTodos(todos);
  });

  const label = document.createElement("label");
  label.htmlFor = liId;
  const labelClassList = ["form-check-label", "flex-grow-1", "py-2"];
  label.classList.add(...labelClassList);
  label.innerText = todo.text;

  li.appendChild(checkbox);
  li.appendChild(label);
  todoList.appendChild(li);
}

form.addEventListener("submit", handleSubmit);
