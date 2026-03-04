import { projects, showProjectDetails } from "./projects.js";
import { lists, showListDetails } from "./lists.js";
import { attachListeners } from "./listeners.js"
import { toDoItems } from "./toDoItems.js";

const generateContent = (function () {
    const renderProjects = () => {
        reset("sidebar", ".project-btn-wrapper");

        const sidebarDiv = document.getElementById("sidebar");
        const newProject = document.getElementById("add-project-btn-wrapper");

        for (let project of projects) {
            sidebarDiv.insertBefore(createBtnContainer(project.title, project.ID, "project-btn-wrapper", "project-btn"), newProject);
        }

        const projectBtns = document.getElementsByClassName("project-btn");
        attachListeners(projectBtns, showProjectDetails);
    };

    const createBtnContainer = (name, ID, wrapperClass, btnClass) => {
        /* 
            div wrapper
                button
        */

        const divElWrapper = document.createElement("div");
        divElWrapper.classList.add(wrapperClass);

        const btnEl = document.createElement("button");
        btnEl.classList.add(btnClass);
        btnEl.dataset.id = ID;

        const spanEl = document.createElement("span");
        spanEl.textContent = name;
        btnEl.appendChild(spanEl);

        divElWrapper.appendChild(btnEl);

        return divElWrapper;
    };

    const reset = (elemID, className) => {
        const elems = document.getElementById(elemID).querySelectorAll(className);

        elems.forEach(elem => elem.remove());
    };

    const renderLists = (projectID) => {
        // list-btn-wrapper and list-btn
        reset("project-view-lists", ".list-btn-wrapper");

        const projectViewLists = document.getElementById("project-view-lists");

        document.getElementById("project-content").classList.remove("inactive");

        const projectViewHeading = document.getElementById("project-view-heading-text");
        const projectViewDescription = document.getElementById("project-view-description-text");

        const newList = document.getElementById("add-list-btn-wrapper");

        let project = projects.find(obj => obj.ID === projectID);

        projectViewHeading.textContent = project.title;
        projectViewDescription.textContent = project.description;

        for (let list of lists) {
            if (list.projectID === projectID) {
                projectViewLists.insertBefore(createBtnContainer(list.title, list.ID, "list-btn-wrapper", "list-btn"), newList);
            }
        }

        const listBtns = document.getElementsByClassName("list-btn");
        attachListeners(listBtns, showListDetails);
    };

    return { renderProjects, renderLists };
})();

const generateSideBarContent = () => generateContent.renderProjects();
const generateProjectDetailsView = (projectID) => generateContent.renderLists(projectID);

export { generateSideBarContent, generateProjectDetailsView };