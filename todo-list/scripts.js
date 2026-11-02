let massTasks = JSON.parse(localStorage.getItem("my-tasks")) || [
  { id: 1, text: "Вакин посиди", completed: true },
  { id: 2, text: "седеш", completed: false },
  { id: 3, text: "серега поспи", completed: true },
];

let form = document.getElementById("form");

let currentFilter = "all";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let textTask = document.getElementById("textTask").value;
  const maxId =
    massTasks.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;

  addTask(maxId, textTask, false);
});

function saveTasksToLocal() {
  localStorage.setItem("my-tasks", JSON.stringify(massTasks));
}

function addTask(id, text, completed) {
  massTasks.push({ id, text, completed });
  console.log(massTasks);
  renderTasks();
}

function deleteTask() {
  massTasks.splice();
}

function saveExpensesToLocal() {
  localStorage.setItem("my-tasks", JSON.stringify(massTasks));
}

function renderTasks() {
  let containerTasks = document.getElementById("tasks-list");
  containerTasks.innerHTML = "";

  massTasks.forEach((element, index) => {
    let temp = `<span>Задача: ${element.text}, Статус: ${element.completed ? "Выполнена" : "Выполняется"}</span>
<input type="checkbox" class="task-check" data-index="${index}" ${element.completed ? "checked" : ""}>
<button class="btnDelete" data-index="${index}">Удалить</button><br>`;
    containerTasks.innerHTML += temp;
  });

  const all_buttons_delete = document.querySelectorAll(".btnDelete");
  const all_checkbox = document.querySelectorAll(".task-check");

  all_buttons_delete.forEach((button) => {
    button.addEventListener("click", () => {
      const indexToRemove = button.dataset.index;
      massTasks.splice(Number(indexToRemove), 1);
      saveTasksToLocal();
      renderTasks();
    });
  });

  all_checkbox.forEach((chbox) => {
    chbox.addEventListener("change", () => {
      const indexToUpdate = chbox.dataset.index;
      massTasks[indexToUpdate].completed = true;
      saveTasksToLocal();
      renderTasks();
    });
  });

  allTasks();
}

function allTasks() {
  const countTasks =
    JSON.parse(localStorage.getItem("my-tasks")).length || massTasks.length;
  const countTaskDiv = document.getElementById("counterTasks");
  countTaskDiv.innerHTML = `Всего задач: ${countTasks}`;
}

renderTasks();
