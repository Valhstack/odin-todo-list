import { projects, attachListeners } from "./projects.js";
import { lists } from "./lists.js";
import { toDoItems } from "./toDoItems.js";

const sidebarContent = (function () {
    const renderProjects = () => {
        resetSidebar();

        const sidebarDiv = document.getElementById("sidebar");
        const newProject = document.getElementById("add-project-btn-wrapper");

        for (let project of projects) {
            sidebarDiv.insertBefore(createProjectStructure(project.title, project.ID), newProject);
        }

        const projectBtns = document.getElementsByClassName("project-btn");
        attachListeners(projectBtns);
    };

    const createProjectStructure = (projectName, projectID) => {
        const divElWrapper = document.createElement("div");
        divElWrapper.classList.add("project-btn-wrapper");

        const btnEl = document.createElement("button");
        btnEl.classList.add("project-btn");
        btnEl.dataset.id = projectID;

        const spanEl = document.createElement("span");
        spanEl.textContent = projectName;
        btnEl.appendChild(spanEl);

        divElWrapper.appendChild(btnEl);

        return divElWrapper;
    };

    const resetSidebar = () => {
        const elems = document.getElementById("sidebar").querySelectorAll(".project-btn-wrapper");

        elems.forEach(elem => elem.remove());
    };

    return { renderProjects };
})();

const generateSideBarContent = () => sidebarContent.renderProjects();

export { generateSideBarContent };