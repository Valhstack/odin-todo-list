import { projects, showProjectDetails } from "./projects.js";
import { lists, showListDetails } from "./lists.js";
import { attachListeners } from "./listeners.js"
import { toDoItems, showTaskDetails, editTask, deleteTask } from "./toDoItems.js";
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

        //let list = lists.find(obj => obj.ID === listID);

        for (let item of toDoItems) {
            if (item.listID === listID) {
                listViewTasks.insertBefore(createTaskContainer(item.title, item.description, formatDate(item.dueDate), item.priority, item.notes, item.ID), newTask);
            }
        }

        const itemsDivs = document.getElementsByClassName("todo-item-wrapper");
        attachListeners(itemsDivs, showTaskDetails);

        const editBtns = document.getElementsByClassName("task-edit-btn");
        attachListeners(editBtns, editTask);

        const deleteBtns = document.getElementsByClassName("task-delete-btn");
        attachListeners(deleteBtns, deleteTask);
    };

    const createTaskContainer = (title, description, dueDate, priority, notes, ID) => {
        /*
            div outer wrapper class = "todo-item-wrapper" -> div V -> divOuterWrapper
                div class = "item-closed-wrapper" -> div III
                    div wrapper for checkbox class = "checkbox-wrapper" -> div I -> divCheckboxWrapper
                        label for item.id
                        input checkbox name = item.title id=item.id
                    div wrapper for due date and priority class = "metadata-wrapper" -> div II -> divDueDatePriorityWrapper
                        p item.dueDate class = "due-date"
                        p • item.priority is set by adding appropriate class
                div item open -> div IV
        */

        const divOuterWrapper = document.createElement("div");
        divOuterWrapper.classList.add("todo-item-wrapper");
        divOuterWrapper.dataset.id = ID;

        const divItemClosed = document.createElement("div");
        divItemClosed.classList.add("item-closed-wrapper");

        const divCheckboxWrapper = document.createElement("div");
        divCheckboxWrapper.classList.add("checkbox-wrapper");

        const labelCheckbox = document.createElement("label");
        labelCheckbox.setAttribute("for", ID);
        labelCheckbox.textContent = title;

        const inputCheckbox = document.createElement("input");
        inputCheckbox.setAttribute("type", "checkbox");
        inputCheckbox.setAttribute("name", title);
        inputCheckbox.setAttribute("id", ID);
        inputCheckbox.classList.add("task-checkbox");

        divCheckboxWrapper.appendChild(inputCheckbox);
        divCheckboxWrapper.appendChild(labelCheckbox);

        // div I is assembled

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

        // div II assembled

        divDueDatePriorityWrapper.appendChild(pDueDate);
        divDueDatePriorityWrapper.appendChild(pPriority);

        // div III assembled

        divItemClosed.appendChild(divCheckboxWrapper);
        divItemClosed.appendChild(divDueDatePriorityWrapper);

        const divItemOpen = createTaskDetailsContainer(description, notes);
        divItemOpen.id = ID;

        // div V assembled

        divOuterWrapper.appendChild(divItemClosed);
        divOuterWrapper.appendChild(divItemOpen);

        return divOuterWrapper;
    };

    const createTaskDetailsContainer = (description, notes) => {
        /*
            div class = "task-details-outer-wrapper" -> divOuterWrapper - IV
                div class = "task-details-wrapper" -> divInnerWrapper - II
                    p class = "task-description"
                    div class="notes-wrapper" -> divNotesWrapper - I
                        h3 Notes class="notes-heading"
                        p class = "task-notes"
                div class = "control-btns-wrapper" -> divBtnsWrapper - III
                    button edit class = "task-edit-btn"
                    button delete class = "task-delete-btn"
        */

        // creating all the elements

        const divOuterWrapper = document.createElement("div");
        divOuterWrapper.classList.add("task-details-outer-wrapper");
        divOuterWrapper.classList.add("inactive");

        const divInnerWrapper = document.createElement("div");
        divInnerWrapper.classList.add("task-details-wrapper");

        const divNotesWrapper = document.createElement("div");
        divNotesWrapper.classList.add("notes-wrapper");

        const divBtnsWrapper = document.createElement("div");
        divBtnsWrapper.classList.add("control-btns-wrapper");

        const pDescription = document.createElement("p");
        pDescription.classList.add("task-description");
        pDescription.textContent = description;

        const h3NotesHeading = document.createElement("h3");
        h3NotesHeading.classList.add("notes-heading");
        h3NotesHeading.textContent = "Notes";

        const pNotes = document.createElement("p");
        pNotes.classList.add("task-notes");
        pNotes.textContent = notes;

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("task-edit-btn");
        btnEdit.textContent = "Edit";

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("task-delete-btn");
        btnDelete.textContent = "Delete";

        // assembling div I

        divNotesWrapper.appendChild(h3NotesHeading);
        divNotesWrapper.appendChild(pNotes);

        // assembling div II

        divInnerWrapper.appendChild(pDescription);
        divInnerWrapper.appendChild(divNotesWrapper);

        // assembling div III

        divBtnsWrapper.appendChild(btnEdit);
        divBtnsWrapper.appendChild(btnDelete);

        // assembling div IV

        divOuterWrapper.appendChild(divInnerWrapper);
        divOuterWrapper.appendChild(divBtnsWrapper);

        return divOuterWrapper;
    };

    return { renderProjects, renderLists, renderItems };
})();

const generateSideBarContent = () => generateContent.renderProjects();
const generateProjectDetailsView = (projectID) => generateContent.renderLists(projectID);
const generateListDetailsView = (listID) => generateContent.renderItems(listID);

export { generateSideBarContent, generateProjectDetailsView, generateListDetailsView };