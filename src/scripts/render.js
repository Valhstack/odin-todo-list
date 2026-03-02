import { projects } from "./projects.js";
import { lists } from "./lists.js";
import { toDoItems } from "./toDoItems.js";

const sidebarContent = (function () {
    const renderProjects = () => {
        const sidebarDiv = document.getElementById("sidebar");
        const newProject = document.getElementById("add-project-btn-wrapper");

        for(let project of projects){
            sidebarDiv.insertBefore(createProjectStructure(project.title), newProject);
        }
    };

    const createProjectStructure = (projectName) => {
        const divElWrapper = document.createElement("div");
        divElWrapper.classList.add("project-btn-wrapper");

        const btnEl = document.createElement("button");
        btnEl.classList.add("project-btn");

        const spanEl = document.createElement("span");
        spanEl.textContent = projectName;
        btnEl.appendChild(spanEl);

        divElWrapper.appendChild(btnEl);

        return divElWrapper;
    };

    return { renderProjects };
})();

const generateSideBarContent = () => sidebarContent.renderProjects();

export { generateSideBarContent };