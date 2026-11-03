let massTasks = JSON.parse(localStorage.getItem("my-tasks")) || [
  { id: 1, text: "Вакин посиди", completed: true },
  { id: 2, text: "седеш", completed: false },
  { id: 3, text: "артем поспи", completed: true },
  { id: 4, text: "завтра сделать 30 отжиманий", completed: false },
  { id: 5, text: "помыть посуду", completed: true },
];

let form = document.getElementById("form");

let currentFilter = "all";

const btnFilterAll = document.getElementById("btn-all");
const btnFilterActive = document.getElementById("btn-active");
const btnFilterComplete = document.getElementById("btn-complete");

btnFilterAll.addEventListener("click", () => {
  currentFilter = "all";
  renderTasks(currentFilter);
});

btnFilterActive.addEventListener("click", () => {
  currentFilter = "active";
  renderTasks(currentFilter);
});

btnFilterComplete.addEventListener("click", () => {
  currentFilter = "complete";
  renderTasks(currentFilter);
});

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
  if (text.trim() === "") {
    alert("Введи текст задачи!!");
    return;
  } else {
    massTasks.push({ id, text, completed });
    saveTasksToLocal();
  }
  renderTasks(currentFilter);
}

function renderTasks(filter) {
  let containerTasks = document.getElementById("tasks-list");
  containerTasks.innerHTML = "";

  let tasksToShow = massTasks;

  if (filter === "active") {
    tasksToShow = massTasks.filter((task) => !task.completed);
  } else if (filter === "complete") {
    tasksToShow = massTasks.filter((task) => task.completed);
  }

  tasksToShow.forEach((element) => {
    let temp = `<span>Задача: ${element.text}, Статус: ${element.completed ? "Выполнена" : "Выполняется"}</span>
<input type="checkbox" class="task-check" data-id="${element.id}" ${element.completed ? "checked" : ""}>
<button class="btnDelete" data-id="${element.id}">Удалить</button><br>`;
    containerTasks.innerHTML += temp;
  });

  const all_buttons_delete = document.querySelectorAll(".btnDelete");
  const all_checkbox = document.querySelectorAll(".task-check");

  all_buttons_delete.forEach((button) => {
    button.addEventListener("click", () => {
      const idToRemove = button.dataset.id;
      massTasks = massTasks.filter((task) => task.id != idToRemove);
      saveTasksToLocal();
      renderTasks(filter);
    });
  });

  all_checkbox.forEach((chbox) => {
    chbox.addEventListener("change", () => {
      const idToUpdate = chbox.dataset.id;
      const task = massTasks.find((t) => t.id === idToUpdate);
      task.completed = chbox.checked;
      saveTasksToLocal();
      renderTasks(filter);
    });
  });

  allTasksAndCompleteTasks();
}

function allTasksAndCompleteTasks() {
  const countTasks = massTasks.length;
  const countTaskDiv = document.getElementById("counterTasks");
  countTaskDiv.innerHTML = `Всего задач: ${countTasks}`;

  const complete = massTasks.filter((task) => task.completed).length;
  const completeTaskDiv = document.getElementById("completeTasks");
  completeTaskDiv.innerHTML = `Выполнено: ${complete}`;
}

renderTasks(currentFilter);
