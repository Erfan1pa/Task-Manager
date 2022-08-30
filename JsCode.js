//clock
const div = document.querySelector(".time");
const clock = document.querySelector("#clock");
const sticker = document.querySelector(".time span");

setTimeout(changeTime, 1000);
function changeTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let second = time.getSeconds();
  if (hour <= 9) {
    hour = "0" + hour;
  }
  if (min <= 9) {
    min = "0" + min;
  }
  if (second <= 9) {
    second = "0" + second;
  }
  clock.textContent = hour + " : " + min + " : " + second;

  if (hour >= 5 && hour < 13) {
    div.style.backgroundColor = "#45aaf2";
    sticker.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  if (hour >= 13 && hour < 21) {
    div.style.backgroundColor = "#fa8231";
    sticker.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  if (hour >= 21 || hour < 5) {
    div.style.backgroundColor = "#1e272e";
    sticker.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }

  setTimeout(changeTime, 1000);
}

//task manger
const inputTask = document.querySelector("#newtask");
const form = document.querySelector("#formTask");
const confirme = document.querySelector("#confirmeAdd");
const ul = document.querySelector(".ulCollection");
const inputFilter = document.querySelector("#filter");
const clearBtn = document.querySelector("#cleartask");

form.addEventListener("submit", addTask);
ul.addEventListener("click", remove);
clearBtn.addEventListener("click", removeAll);
inputFilter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", lsToUl);
function addTask(e) {
  if (inputTask.value == "") {
    alert("Add a Task");
  } else {
    let li = document.createElement("li");
    li.className = "item";
    li.appendChild(document.createTextNode(inputTask.value));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    li.appendChild(link);
    ul.appendChild(li);
    addToLS(inputTask.value);
    inputTask.value = "";
  }
  e.preventDefault();
}
function addToLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function remove(e) {
  if (e.target.parentElement.parentElement.classList.contains("item")) {
    e.target.parentElement.parentElement.remove();
  }
  removeFromls(e.target.parentElement.parentElement);
}
function removeAll() {
  if (confirm("ARE YOUR SURE?")) {
    // ul.innerHTML = "";
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    localStorage.clear();
  }
}
function filterTask() {
  let text = inputFilter.value.toLowerCase();
  let item = document.querySelectorAll(".item");
  item.forEach(function (Collection) {
    let type = Collection.textContent.toLowerCase();
    if (type.indexOf(text) == -1) {
      Collection.style.display = "none";
    } else {
      Collection.style.display = "block";
    }
  });
}
function lsToUl() {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (item) {
    let li = document.createElement("li");
    li.className = "item";
    li.appendChild(document.createTextNode(item));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    li.appendChild(link);
    ul.appendChild(li);
  });
}
function removeFromls(item) {
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (check, index) {
    if (item.textContent === check) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
