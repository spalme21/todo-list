import Task from "./task";

export default class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  addTask(title, dueDate, priority, notes) {
    this.tasks.append(new Task(title, dueDate, priority, notes));
  }
}