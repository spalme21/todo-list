import "./style.css"; 
import Project from "./project";

class DOMHandler {
  constructor() {
    this.body = document.querySelector("body");
    this.header = document.createElement("div");
    this.header.setAttribute("id", "header");
    this.body.appendChild(this.header);
    this.main = document.createElement("div");
    this.main.setAttribute("id", "main");
    this.body.appendChild(this.main);
  }
}
new DOMHandler();