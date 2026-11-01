const massTasks = [
  { id: 1, text: "Вакин посиди", completed: true },
  { id: 2, text: "седеш", completed: false },
  { id: 3, text: "серега поспи", completed: true },
];

let form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let textTask = document.getElementById("textTask").value;
  const maxId =
    massTasks.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;

  addTask(maxId, textTask, false);
});

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

  massTasks.forEach((element) => {
    let temp = `<div id="task"><span>id: ${element.id}, Задача: ${element.text}, Статус: ${element.completed == true ? "Выполнена" : "Выполняется"}</span><button class="btnDelete">Удалить</button></div>`;
    containerTasks.innerHTML += temp;
  });
}

renderTasks();

const all_buttons_delete = document.querySelectorAll(".btnDelete");
all_buttons_delete.forEach((button) => {
  button.addEventListener("click", () => {
    const indexToRemove = button.dataset.index;
    massTasks.splice(Number(indexToRemove), 1);
    renderTasks();
  });
});
