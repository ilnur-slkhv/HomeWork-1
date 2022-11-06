export function setTasksRefresh(minutes, key) {
  const setTime = new Date(new Date().getTime() + minutes * 60000);
  localStorage.setItem(key, setTime);
}

export function serializeSample(elements) {
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
