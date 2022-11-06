export class TasksInfo {
  constructor(
    selectorTemplate,
    handleEditTaskInfo,
    handleUrgencyTask,
    handleStageTask,
    handleDeleteTask
  ) {
    this._selectorTemplate = selectorTemplate;
    this._handleEditTaskInfo = handleEditTaskInfo;
    this._handleUrgencyTask = handleUrgencyTask;
    this._handleStageTask = handleStageTask;
    this._handleDeleteTask = handleDeleteTask;
    this._tasks = {};
  }

  setData() {}

  _getTempate() {
    return document.querySelector(this._selectorTemplate).content.children[0];
  }

  getElement() {
    this.element = this._gitTemplate().cloneNode(true);
  }
}
