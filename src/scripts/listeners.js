import { addNewProject } from "./projects.js";
import { addNewList } from "./lists.js";
import { addNewItem, toDoItems, editExistingItem, deleteItem } from "./toDoItems.js";
import { generateSideBarContent, generateProjectDetailsView, generateListDetailsView } from "./render.js";

function buttonsListeners() {
    const dialogProject = document.getElementById("add-project-dialog");
    const dialogList = document.getElementById("add-list-dialog");
    const dialogTask = document.getElementById("add-task-dialog");
    const dialogDeleteTask = document.getElementById("delete-task-dialog");

    document.getElementById("add-project-btn").addEventListener("click", () => {
        dialogProject.showModal();
    });

    document.getElementById("add-list-btn").addEventListener("click", () => {
        dialogList.showModal();
    });

    document.getElementById("add-item-btn").addEventListener("click", () => {
        if (!document.querySelector('.list-btn[data-selected="true"]')) {
            alert("Please select a list first to add a task to it");
        }
        else {
            dialogTask.showModal();
        }
    });

    const formProject = document.getElementById("form-project");
    const formList = document.getElementById("form-list");
    const formTask = document.getElementById("form-task");

    dialogProject.addEventListener("close", () => {
        const action = dialogProject.returnValue;

        if (action === "save") {
            const formData = new FormData(formProject);

            addNewProject(formData.get("project_title"), formData.get("project_description"));
            generateSideBarContent();

            formProject.reset();
        }
    });

    dialogList.addEventListener("close", () => {
        const action = dialogList.returnValue;

        if (action === "save") {
            const formData = new FormData(formList);
            const currentProject = document.querySelector('.project-btn[data-selected="true"]');

            addNewList(formData.get("list_title"), formData.get("list_description"), currentProject.dataset.id);
            generateProjectDetailsView(currentProject.dataset.id);

            formList.reset();
        }
    });

    dialogTask.addEventListener("close", () => {
        const action = dialogTask.returnValue;

        if (action === "save") {
            const formData = new FormData(formTask);
            const currentList = document.querySelector('.list-btn[data-selected="true"]');

            addNewItem(formData.get("task_title"), formData.get("task_description"), formData.get("task_dueDate"), formData.get("task_priority"), false, formData.get("task_notes"), currentList.dataset.id);

            generateListDetailsView(currentList.dataset.id);
        }
        else if (action === "save-edit") {
            const formData = new FormData(formTask);
            const currentItem = document.querySelector('.todo-item-wrapper[data-selected="true"]');
            const currentList = document.querySelector('.list-btn[data-selected="true"]');

            editExistingItem(formData.get("task_title"), formData.get("task_description"), formData.get("task_dueDate"), formData.get("task_priority"), formData.get("task_notes"), currentItem.dataset.id);

            generateListDetailsView(currentList.dataset.id);
            const updatedItem = document.querySelector(`.todo-item-wrapper[data-id="${currentItem.dataset.id}"]`);
            updatedItem.querySelector(".task-details-outer-wrapper").classList.remove("inactive");
        }

        formTask.reset();
    });

    document.getElementById("delete-task-btn").addEventListener("click", () => {
        dialogDeleteTask.close("delete");
    });

    document.getElementById("cancel-delete-task-btn").addEventListener("click", () => {
        dialogDeleteTask.close("cancel");
    });

    dialogDeleteTask.addEventListener("close", () => {
        const action = dialogDeleteTask.returnValue;

        if (action === "delete") {
            const currentItem = document.querySelector('.todo-item-wrapper[data-selected="true"]');
            const currentList = document.querySelector('.list-btn[data-selected="true"]');

            deleteItem(currentItem.dataset.id);

            generateListDetailsView(currentList.dataset.id);
        }
    });

    // changing the isDone state of todo item
    document.addEventListener("change", (e) => {
        if (e.target.matches(".checkbox-wrapper input")) {

            const todoItem = e.target.closest(".todo-item-wrapper");

            if (e.target.checked) {
                toDoItems.find(obj => obj.ID === todoItem.dataset.id).isDone = true;
            } else {
                toDoItems.find(obj => obj.ID === todoItem.dataset.id).isDone = false;
            }
        }
    });
}

const attachListeners = (btns, handler) => {
    for (let btn of btns) {
        btn.addEventListener("click", handler);
    }
}

export { buttonsListeners, attachListeners }