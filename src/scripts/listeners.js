import { projects } from "./projects.js";
import { lists } from "./lists.js";
import { toDoItems } from "./toDoItems.js";

export function buttonsListeners() {
    const dialog = document.getElementById("add-project-dialog");

    document.getElementById("add-project-btn").addEventListener("click", () => {
        dialog.showModal();
    });

    const form = document.getElementById("form");

    dialog.addEventListener("close", () => {
        const action = dialog.returnValue;

        if (action === "save") {
            const formData = new FormData(form);

            form.reset();
        }
    });
}