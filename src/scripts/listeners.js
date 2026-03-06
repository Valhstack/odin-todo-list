import { addNewProject, editProject, editExistingProject, deleteProject, deleteProjectHandler } from "./projects.js";
import { addNewList, editList, deleteList } from "./lists.js";
import { addNewItem, toDoItems, editExistingItem, deleteItem } from "./toDoItems.js";
import { generateSideBarContent, generateProjectDetailsView, generateListDetailsView, reset } from "./render.js";

function buttonsListeners() {
    const dialogProject = document.getElementById("add-project-dialog");
    const dialogList = document.getElementById("add-list-dialog");
    const dialogTask = document.getElementById("add-task-dialog");
    const dialogDeleteTask = document.getElementById("delete-task-dialog");
    const dialogDeleteProject = document.getElementById("delete-project-dialog");
    const dialogDeleteList = document.getElementById("delete-list-dialog");
    const dialogNoList = document.getElementById("no-list-dialog");

    document.getElementById("add-project-btn").addEventListener("click", () => {
        document.getElementById("save-btn").value = "save";
        dialogProject.showModal();
    });

    document.getElementById("add-list-btn").addEventListener("click", () => {
        document.getElementById("save-list-btn").value = "save";
        dialogList.showModal();
    });

    document.getElementById("add-item-btn").addEventListener("click", () => {
        if (!document.querySelector('.list-btn[data-selected="true"]')) {
            dialogNoList.showModal();
        }
        else {
            document.getElementById("save-task-btn").value = "save";
            dialogTask.showModal();
        }
    });

    document.getElementById("no-list-dialog-btn").addEventListener("click", () => {
        dialogNoList.close("ok");
    });

    document.getElementById("edit-project-btn").addEventListener("click", editProject);
    document.getElementById("delete-project-btn").addEventListener("click", deleteProjectHandler);

    const formProject = document.getElementById("form-project");
    const formList = document.getElementById("form-list");
    const formTask = document.getElementById("form-task");

    dialogProject.addEventListener("close", () => {
        const action = dialogProject.returnValue;

        if (action === "save") {
            const formData = new FormData(formProject);

            addNewProject(formData.get("project_title"), formData.get("project_description"));
            generateSideBarContent();
        }
        else if (action === "save-edit") {
            const formData = new FormData(formProject);
            const currentProject = document.querySelector('.project-btn[data-selected="true"]');

            editExistingProject(formData.get("project_title"), formData.get("project_description"), currentProject.dataset.id);
            generateSideBarContent();
            generateProjectDetailsView(currentProject.dataset.id);
            const updatedProject = document.querySelector(`.project-btn[data-id="${currentProject.dataset.id}"]`);
            updatedProject.dataset.selected = "true";
        }

        formProject.reset();
    });

    dialogList.addEventListener("close", () => {
        const action = dialogList.returnValue;
        const currentProject = document.querySelector('.project-btn[data-selected="true"]');

        if (action === "save") {
            const formData = new FormData(formList);

            addNewList(formData.get("list_title"), formData.get("list_description"), currentProject.dataset.id);
            generateProjectDetailsView(currentProject.dataset.id);
        }
        else if (action === "save-edit") {
            const formData = new FormData(formList);
            const currentList = document.querySelector('.list-btn[data-selected="true"]');

            editList(formData.get("list_title"), formData.get("list_description"), currentList.dataset.id);
            generateProjectDetailsView(currentProject.dataset.id);
            const updatedList = document.querySelector(`.list-btn[data-id="${currentList.dataset.id}"]`);
            updatedList.dataset.selected = "true";
        }

        formList.reset();
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

    document.getElementById("delete-project-dialog-btn").addEventListener("click", () => {
        dialogDeleteProject.close("delete");
    });

    document.getElementById("cancel-delete-project-btn").addEventListener("click", () => {
        dialogDeleteProject.close("cancel");
    });

    dialogDeleteProject.addEventListener("close", () => {
        const action = dialogDeleteProject.returnValue;

        if (action === "delete") {
            const currentProject = document.querySelector('.project-btn[data-selected="true"]');

            deleteProject(currentProject.dataset.id);

            generateSideBarContent();
            document.getElementById("project-content").classList.add("inactive");
        }
    });

    document.getElementById("delete-list-dialog-btn").addEventListener("click", () => {
        dialogDeleteList.close("delete");
    });

    document.getElementById("cancel-delete-list-btn").addEventListener("click", () => {
        dialogDeleteList.close("cancel");
    });

    dialogDeleteList.addEventListener("close", () => {
        const action = dialogDeleteList.returnValue;

        if (action === "delete") {
            const currentList = document.querySelector('.list-btn[data-selected="true"]');
            const currentProject = document.querySelector('.project-btn[data-selected="true"]');

            deleteList(currentList.dataset.id);
            generateProjectDetailsView(currentProject.dataset.id);
            reset("list-view-tasks", ".todo-item-wrapper");
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