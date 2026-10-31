let expenses = JSON.parse(localStorage.getItem("my-expenses")) || [
  { category: "еда", amount: 500, date: "2023-10-01" },
  { category: "транспорт", amount: 150, date: "2023-10-02" },
  { category: "еда", amount: 300, date: "2023-10-03" },
  { category: "развлечения", amount: 800, date: "2023-10-04" },
  { category: "еда", amount: 450, date: "2023-10-06" },
];

function addExpense(category, amount, date) {
  expenses.push({ category: category, amount: amount, date: date });
}

function saveExpensesToLocal() {
  localStorage.setItem("my-expenses", JSON.stringify(expenses));
}

function getTotalExpenses() {
  let mas_amount = expenses.map((item) => item.amount);
  return mas_amount.reduce((sum, current) => (sum += current), 0);
}

function getExpensesByCategory() {
  const result = expenses.reduce((acc, item) => {
    if (acc[item.category]) {
      acc[item.category] += item.amount;
    } else {
      acc[item.category] = item.amount;
    }
    return acc;
  }, {});
  return result;
}

function getMostExpensiveCategory() {
  const mas_category_and_amount = Object.entries(getExpensesByCategory());
  return mas_category_and_amount.sort((a, b) => b[1] - a[1])[0];
}

function SaveExpenses(expenses) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (expenses.length !== 0) {
        resolve("Расходы успешно сохранены!");
      } else {
        reject("ошибка!");
      }
    }, 1000);
  });
}

const form = document.getElementById("form-text");
const save_button = document.getElementById("save-button");
save_button.addEventListener("click", (event) => {
  event.preventDefault();
  SaveExpenses(expenses)
    .then((res) => alert(res))
    .catch((err) => alert(err));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const category = document.getElementById("category").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  addExpense(category, Number(amount), date);

  console.log("Категория:", category);
  console.log("Сумма:", amount);
  console.log("Дата:", date);

  renderExpenses();
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
});

function renderExpenses() {
  let container = document.getElementById("expenses-list");
  container.innerHTML = "";

  let categories_list = document.getElementById("categories-list");
  categories_list.innerHTML = "";
  let objByCategory = getExpensesByCategory();
  for (const [name, amount] of Object.entries(objByCategory)) {
    categories_list.innerHTML += `<p>${name}: ${amount}`;
  }

  expenses.forEach((element, index) => {
    let temp = `<span>Категория: ${element.category}, количество: ${element.amount}, дата: ${element.date} </span><button class="delete-btn" data-index="${index}">Удалить</button><br>`;
    container.innerHTML += temp;
  });
  let total_sum = document.getElementById("total");

  const all_buttons_delete = document.querySelectorAll(".delete-btn");
  all_buttons_delete.forEach((button) => {
    button.addEventListener("click", () => {
      const indexToRemove = button.dataset.index;
      expenses.splice(Number(indexToRemove), 1);
      saveExpensesToLocal();
      renderExpenses();
    });
  });

  total_sum.innerHTML = "Итоговое кол-во: ";
  total_sum.innerHTML += getTotalExpenses();
  saveExpensesToLocal();
}

renderExpenses();
