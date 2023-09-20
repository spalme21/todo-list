import Project from "./project";

export default class DOMManager {
  constructor() {
    this.projects = [];
    this.activeProject = null;
    this.boundActivateProject = this.activateProject.bind(this);
  }
  
  loadPage() {
    const body = document.querySelector("body");
    body.textContent = "";
    body.appendChild(this.createHeader());
    body.appendChild(this.createSidebar());
    body.appendChild(this.createTaskContainer());
  }

  /* Header */

  createHeader() {
    const header = document.createElement("header");
    header.setAttribute("id", "header");
    const title = document.createElement("h1");
    title.textContent = "Todo List";
    header.appendChild(title);  
    return header;
  }

  /* Sidebar */

  createSidebar() {
    const sidenav = document.createElement("div");
    sidenav.setAttribute("id", "sidenav");

    const h2 = document.createElement("h2");
    h2.textContent = "Projects";
    sidenav.appendChild(h2);

    const projectDiv = document.createElement("div");
    projectDiv.id = "project-list";
    projectDiv.appendChild(this.createNewProjectButton());
    projectDiv.appendChild(this.createNewProjectForm());
    this.projects.forEach((project, index) => {
      projectDiv.appendChild(this.createProjectLink(project, index));
    });
    sidenav.appendChild(projectDiv);

    return sidenav;
  }

  createNewProjectButton() {
    const add = document.createElement("button");
    add.setAttribute("type", "button");
    add.setAttribute("id", "new-project-form");
    add.classList.add("btn");
    add.textContent = "New Project";
    add.addEventListener("click", this.openAddProject);
    return add;
  }

  createNewProjectForm() {
    const form = document.createElement("form");
    form.classList.add("form-popup");
    form.setAttribute("id", "project-form");
    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Project name";
    name.name = "project-name";
    name.id = "project-name";
    name.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("create-project").click();
      }
    })
    form.appendChild(name);
    const buttons = document.createElement("div");
    buttons.classList.add("form-buttons");
    const createButton = document.createElement("button");
    createButton.type = "button";
    createButton.id = "create-project";
    createButton.classList.add("project-form-button");
    createButton.textContent = "Create";
    createButton.addEventListener("click", () => {
      this.createProject();
      this.loadPage();
    });
    buttons.appendChild(createButton);
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.id = "close-form";
    cancelButton.classList.add("project-form-button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", this.closeForm);
    buttons.appendChild(cancelButton);
    form.appendChild(buttons);
    return form;
  }

  openAddProject() {
    document.getElementById("project-name").value = "";
    document.getElementById("project-form").style.display = "block";
    document.getElementById("new-project-form").style.display= "none";
  }

  closeForm() {
    document.getElementById("project-form").style.display = "none";
    document.getElementById("new-project-form").style.display= "block";
  }

  createProject() {
    const project = new Project(
      document.getElementById("project-name").value
    );
    this.projects.push(project);
    this.activeProject = project;
  }

  createProjectLink(project, index) {
    const projectButton = document.createElement("button");
    projectButton.type = "button";
    projectButton.dataset.index = index;
    projectButton.classList.add("project-link");
    projectButton.textContent = project.title;
    projectButton.addEventListener("click", this.boundActivateProject);
    return projectButton;
  }

  activateProject(e) {
    const index = e.target.dataset.index;
    this.activeProject = this.projects[index];
    this.loadPage();  
  }

  /* Task List */

  createTaskContainer() {
    const taskContainer = document.createElement("div"); 
    taskContainer.classList.add("task-container");

    if (this.activeProject) {
      taskContainer.appendChild(this.createTaskButton());
      taskContainer.appendChild(this.createTaskForm());
      taskContainer.appendChild(this.createTaskList());
    }

    return taskContainer;
  }

  createTaskButton() {
    const addTask = document.createElement("button");
    addTask.setAttribute("type", "button");
    addTask.setAttribute("id", "new-task-form");
    addTask.classList.add("btn");
    addTask.textContent = "New Task";
    addTask.addEventListener("click", this.openAddTask);
    return addTask;
  }

  createTaskForm() {
    const form = document.createElement("form");
    form.classList.add("form-popup");
    form.setAttribute("id", "task-form");
    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Task";
    name.name = "task-name";
    name.id = "task-name";
    name.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("create-task").click();
      }
    })
    form.appendChild(name);
    const buttons = document.createElement("div");
    buttons.classList.add("form-buttons");
    const createButton = document.createElement("button");
    createButton.type = "button";
    createButton.id = "create-task";
    createButton.classList.add("task-form-button");
    createButton.textContent = "Create";
    createButton.addEventListener("click", () => {
      this.createTask();
      this.loadPage();
    });
    buttons.appendChild(createButton);
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.id = "close-form";
    cancelButton.classList.add("task-form-button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", this.closeTaskForm);
    buttons.appendChild(cancelButton);
    form.appendChild(buttons);
    return form;
  }

  openAddTask() {
    document.getElementById("task-name").value = "";
    document.getElementById("task-form").style.display = "block";
    document.getElementById("new-task-form").style.display= "none";
  }

  closeTaskForm() {
    document.getElementById("task-form").style.display = "none";
    document.getElementById("new-task-form").style.display= "block";
  }

  createTask() {
    const taskName = document.getElementById("task-name").value;
    this.activeProject.addTask(taskName);
  }

  createTaskList() {
    const taskList = document.createElement("ul");
    taskList.id = "task-list";
    this.activeProject.tasks.forEach((task, index) => {
      taskList.appendChild(this.displayTask(task, index));
    });
    return taskList;
  }

  displayTask(task, index) {
    const taskDisplay = document.createElement("li");
    taskDisplay.id = `task-${index}`;
    taskDisplay.textContent= task.title;
    return taskDisplay;
  }

}