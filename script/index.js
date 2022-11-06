import { api } from "./api.js";
import { Card } from "./card.js";
import { Arise } from "./arise.js";
import { serializeSample, setTasksRefresh } from "./util.js";
import { MAX_LIVE_STORAGE } from "./constatnts.js";

const cardsBox = document.querySelector(".cards");
const btnOpenAriseSample = document.querySelector("#addTask");
const btnOpenAriseLogin = document.querySelector("#login");
const sampleTaskAdd = document.querySelector("#arise-sample-task");
const sampleLogin = document.querySelector("#arise-sample-login");

const ariseAddTask = new Arise("arise-add-task");
ariseAddTask.setEventListener();

const ariseLogin = new Arise("arise-login");
ariseLogin.setEventListener();

const ariseTaskInfo = new Arise("arise-task-info");
ariseTaskInfo.setEventListener();

const arisePhoto = new Arise("arise-photo");
arisePhoto.setEventListener();

function createTask(dataTask) {
  const cardInstance = new Card(
    dataTask,
    "#card-template",
    handleTaskTitle,
    handleTaskPhoto
  );
  const newCardElement = cardInstance.getElement();
  cardsBox.append(newCardElement);
}

function handleSampleAddTask(e) {
  e.preventDefault();
  const elementsSampleTask = [...sampleTaskAdd.elements];
  const dataFromSample = serializeSample(elementsSampleTask);

  console.log(dataFromSample);

  api.addNewTask(dataFromSample).then(() => {
    createTask(dataFromSample);
    updateLocalStorage(dataFromSample, { type: "ADD_TASK" });
    ariseAddTask.close();
  });
}

function handleSampleLogin(e) {
  e.preventDefault();
  const elementsSampleTask = [...sampleTaskAdd.elements];
  const dataFromSample = serializeSample(elementsSampleTask);
  console.log(dataFromSample);
  Cookies.set("email", `email = ${dataFromSample.email}`);
  btnOpenAriseSample.classList.remove("visually-hidden");
  ariseLogin.close();
}

function checkLocalStorage() {
  const localData = JSON.parse(localStorage.getItem("tasks"));
  const getTimesExpires = localStorage.getItem("tasksRefresh");

  if (localData && localData.length && new Date() < new Date(getTimesExpires)) {
    localData.forEach(function (taskData) {
      createTask(taskData);
    });
  } else {
    api.getAllTasks().then((tasks) => {
      tasks.forEach(function (taskData) {
        createTask(taskData);
      });

      updateLocalStorage(tasks, { type: "ALL_TASKS" });
    });
  }
}

function updateLocalStorage(tasks, action) {
  const oldStorage = JSON.parse(localStorage.getItem("tasks"));

  switch (action.type) {
    case "ADD_TASK":
      oldStorage.push(tasks);
      localStorage.setItem("tasks", JSON.stringify(oldStorage));
      return;
    case "ALL_TASKS":
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTasksRefresh(MAX_LIVE_STORAGE, "tasksRefresh");
      return;
    case "DELETE_TASK":
      const newStorage = oldStorage.filter((task) => task.id !== tasks.id);
      localStorage.setItem("tasks", JSON.stringify(newStorage));
      return;
    default:
      break;
  }
}

function handleTaskTitle() {
  ariseTaskInfo.open();
}

function handleTaskPhoto() {
  arisePhoto.open();
}

btnOpenAriseSample.addEventListener("click", () => ariseAddTask.open());
btnOpenAriseLogin.addEventListener("click", () => ariseLogin.open());
sampleTaskAdd.addEventListener("submit", handleSampleAddTask);

sampleLogin.addEventListener("submit", handleSampleLogin);

const isAuth = Cookies.get("email");

if (!isAuth) {
  ariseLogin.open();
  btnOpenAriseSample.classList.add("visually-hidden");
}

checkLocalStorage();
