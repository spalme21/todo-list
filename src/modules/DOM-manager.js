export default class DOMManager {
  
  static loadPage() {
    const body = document.querySelector("body");
    body.appendChild(DOMManager.createHeader());
    body.appendChild(DOMManager.createSidebar());
  }

  static createHeader() {
    const header = document.createElement("header");
    header.setAttribute("id", "header");
    const title = document.createElement("h1");
    title.textContent = "Todo List";
    header.appendChild(title);  
    return header;
  }

  static createSidebar() {
    const sidenav = document.createElement("div");
    sidenav.setAttribute("id", "sidenav");
    const projects = document.createElement("h2");
    projects.textContent = "Projects";
    sidenav.appendChild(projects);
    sidenav.appendChild(DOMManager.createNewProjectButton());
    sidenav.appendChild(DOMManager.createNewProjectForm());
    return sidenav;
  }

  static createNewProjectButton() {
    const add = document.createElement("button");
    add.setAttribute("type", "button");
    add.setAttribute("id", "new-project-form");
    add.classList.add("btn");
    add.textContent = "New Project";
    add.addEventListener("click", DOMManager.openAddProject);
    return add;
  }

  static createNewProjectForm() {
    const form = document.createElement("form");
    form.classList.add("form-popup");
    form.setAttribute("id", "project-form");
    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Project name";
    name.name = "project-name";
    form.appendChild(name);
    const buttons = document.createElement("div");
    buttons.classList.add("form-buttons");
    const createButton = document.createElement("button");
    createButton.type = "button";
    createButton.id = "create-project";
    createButton.textContent = "Create";
    createButton.addEventListener("click", DOMManager.createProject);
    buttons.appendChild(createButton);
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.id = "close-form";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", DOMManager.closeForm);
    buttons.appendChild(cancelButton);
    form.appendChild(buttons);
    // document.querySelector(".close-form").addEventListener("click", DOMManager.closeForm());
    return form;
  }

  static openAddProject() {
    document.getElementById("project-form").style.display = "block";
    document.getElementById("new-project-form").style.display= "none";
  }

  static createProject() {

  }

  static closeForm() {
    document.getElementById("project-form").style.display = "none";
    document.getElementById("new-project-form").style.display= "block";
  }
}