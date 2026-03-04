import { projects, showProjectDetails } from "./projects.js";
import { lists, showListDetails } from "./lists.js";
import { attachListeners } from "./listeners.js"
import { toDoItems } from "./toDoItems.js";
import { formatDate } from "./formatDate.js";

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
        reset("list-btns-wrapper", ".list-btn-wrapper");

        const projectViewLists = document.getElementById("list-btns-wrapper");

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

    const renderItems = (listID) => {
        reset("list-view-tasks", ".todo-item-wrapper");

        const newTask = document.getElementById("add-item-btn-wrapper");
        const listViewTasks = document.getElementById("list-view-tasks");

        let list = lists.find(obj => obj.ID === listID);

        for (let item of toDoItems) {
            if (item.listID === listID) {
                listViewTasks.insertBefore(createCheckboxContainer(item.title, formatDate(item.dueDate), item.priority, item.ID), newTask);
            }
        }
    };

    const createCheckboxContainer = (title, dueDate, priority, ID) => {
        /*
            div outer wrapper class = "todo-item-wrapper"
                div wrapper for checkbox class = "checkbox-wrapper"
                    label for item.id
                    input checkbox name = item.title id=item.id
                div wrapper for due date and priority class = "metadata-wrapper"
                    p item.dueDate class = "due-date"
                    p • item.priority is set by adding appropriate class
        */

        const divOuterWrapper = document.createElement("div");
        divOuterWrapper.classList.add("todo-item-wrapper");
        divOuterWrapper.dataset.id = ID;

        const divCheckboxWrapper = document.createElement("div");
        divCheckboxWrapper.classList.add("checkbox-wrapper");

        const labelCheckbox = document.createElement("label");
        labelCheckbox.setAttribute("for", ID);
        labelCheckbox.textContent = title;

        const inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute("type", "checkbox");
        inputCheckbox.setAttribute("name", title);
        inputCheckbox.setAttribute("id", ID);

        divCheckboxWrapper.appendChild(inputCheckbox);
        divCheckboxWrapper.appendChild(labelCheckbox);

        // first div is assembled

        const divDueDatePriorityWrapper = document.createElement("div");
        divDueDatePriorityWrapper.classList.add("metadata-wrapper");

        const pDueDate = document.createElement("p");
        pDueDate.classList.add("due-date");
        pDueDate.textContent = dueDate;

        const pPriority = document.createElement("p");
        pPriority.classList.add("item-priority")

        switch (priority) {
            case "Low":
                pPriority.textContent = "Low";
                pPriority.classList.add("low-priority");
                break;
            case "Medium":
                pPriority.textContent = "Medium";
                pPriority.classList.add("medium-priority");
                break;
            case "High":
                pPriority.textContent = "High";
                pPriority.classList.add("high-priority");
                break;
        }

        divDueDatePriorityWrapper.appendChild(pDueDate);
        divDueDatePriorityWrapper.appendChild(pPriority);

        // second div assembled

        divOuterWrapper.appendChild(divCheckboxWrapper);
        divOuterWrapper.appendChild(divDueDatePriorityWrapper);

        // main div assembled

        return divOuterWrapper;
    };

    return { renderProjects, renderLists, renderItems };
})();

const generateSideBarContent = () => generateContent.renderProjects();
const generateProjectDetailsView = (projectID) => generateContent.renderLists(projectID);
const generateListDetailsView = (listID) => generateContent.renderItems(listID);

export { generateSideBarContent, generateProjectDetailsView, generateListDetailsView };