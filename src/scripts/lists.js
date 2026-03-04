import { projects } from "./projects.js";

const lists = [];

class List {
    constructor(title, description, projectID) {
        this.title = title;
        this.description = description;
        this.projectID = projectID;
        this.ID = self.crypto.randomUUID();
    }
}

const addNewList = (title, description, projectID) => {
    lists.push(new List(title, description, projectID));
}

function showListDetails(e) {
    const listID = e.currentTarget.dataset.id;

    const currentBtn = e.currentTarget;
    const selectedBtn = document.querySelector('.list-btn[data-selected="true"]');

    if (selectedBtn && selectedBtn !== currentBtn) {
        selectedBtn.removeAttribute("data-selected");
    }

    currentBtn.dataset.selected = "true";
}

export { lists, addNewList, showListDetails };