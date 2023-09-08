import Task from "./task";

class Project {
  constructor(title) {
    this.title = title;
    this.tasks = [];
  }

  addTask(title, dueDate, priority, notes) {
    this.tasks.append(new Task(title, dueDate, priority, notes));
  }
}

export default Project;