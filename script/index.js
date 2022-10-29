const cardsBox = document.querySelector(".cards");
const btnOpenAriseSample = document.querySelector("#addTask");
const sampleTaskAdd = document.querySelector("#arise-sample-task");
const ariseAddTask = new Arise("arise-add-task");
ariseAddTask.setEventListener();

function serializeSample(elements) {
  const sampleData = {};

  elements.forEach((input) => {
    if (input.type === "submit") return;

    if (input.type !== "checkbox") {
      sampleData[input.name] = input.value;
    }

    if (input.type === "checkbox") {
      sampleData[input.name] = input.checked;
    }
  });

  return sampleData;
}

function handleSampleAddTask(e) {
  e.preventDefault();
  const elementsSampleTask = [...sampleTaskAdd.elements];
  const dataFromSample = serializeSample(elementsSampleTask);

  console.log(dataFromSample);

  const cardInstance = new Card(dataFromSample, "#card-template");
  const newCardElement = cardInstance.getElement();
  cardsBox.append(newCardElement);

  ariseAddTask.close();
}

tasks.forEach(function (taskData) {
  const cardInstance = new Card(taskData, "#card-template");
  const newCardElement = cardInstance.getElement();
  cardsBox.append(newCardElement);
});

btnOpenAriseSample.addEventListener("click", () => ariseAddTask.open());
sampleTaskAdd.addEventListener("submit", handleSampleAddTask);
