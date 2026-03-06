import "./styles.css";
import { buttonsListeners } from "./scripts/listeners.js";
import { generateSideBarContent, generateProjectDetailsView } from "./scripts/render.js";
import { projects } from "./scripts/projects.js";

buttonsListeners();
generateSideBarContent();

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}

if (window.innerWidth <= 430) {
    document.getElementById("burger-menu-btn").classList.remove("inactive");
}
else {
    document.getElementById("burger-menu-btn").classList.add("inactive");
}

document.querySelector(`.project-btn[data-id="${projects[0].ID}"]`).dataset.selected = "true";
generateProjectDetailsView(projects[0].ID);