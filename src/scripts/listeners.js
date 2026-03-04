import { addNewProject } from "./projects.js";
import { addNewList } from "./lists.js";
import { toDoItems } from "./toDoItems.js";
import { generateSideBarContent, generateProjectDetailsView } from "./render.js"

function buttonsListeners() {
    const dialogProject = document.getElementById("add-project-dialog");
    const dialogList = document.getElementById("add-list-dialog");

    document.getElementById("add-project-btn").addEventListener("click", () => {
        dialogProject.showModal();
    });

    document.getElementById("add-list-btn").addEventListener("click", () => {
        dialogList.showModal();
    });

    const formProject = document.getElementById("form-project");
    const formList = document.getElementById("form-list");

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
}

const attachListeners = (btns, handler) => {
    for (let btn of btns) {
        btn.addEventListener("click", handler);
    }
}

export { buttonsListeners, attachListeners }