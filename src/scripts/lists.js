import { projects } from "./projects.js";
import { generateListDetailsView } from "./render.js";
import { deleteAllItems } from "./toDoItems.js";

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
        selectedBtn.querySelector(".list-control-btns-wrapper").classList.add("inactive");
    }

    currentBtn.dataset.selected = "true";
    generateListDetailsView(listID);
}

const deleteAllLists = (projectID) => {
    for (let i = lists.length - 1; i >= 0; i--) {
        if (lists[i].projectID === projectID) {

            deleteAllItems(lists[i].ID); // delete items first
            lists.splice(i, 1);          // then delete the list

        }
    }
};

export { lists, addNewList, showListDetails, deleteAllLists };