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
        selectedBtn.nextSibling.classList.add("inactive"); //(".list-control-btns-wrapper")
        selectedBtn.removeAttribute("data-selected");
    }

    currentBtn.dataset.selected = "true";
    generateListDetailsView(listID);
}

function editListHandler(e) {
    e.stopPropagation();
    const listID = document.querySelector('.list-btn[data-selected="true"]').dataset.id;

    document.getElementById("save-list-btn").value = "save-edit";

    document.getElementById("add-list-dialog").showModal();

    const list = lists.find(obj => obj.ID === listID);

    document.getElementById("list_title").value = list.title;
    document.getElementById("list_description").value = list.description;
}

const editList = (title, description, listID) => {
    const list = lists.find(obj => obj.ID === listID);

    list.title = title;
    list.description = description;
};

const deleteAllLists = (projectID) => {
    for (let i = lists.length - 1; i >= 0; i--) {
        if (lists[i].projectID === projectID) {
            deleteAllItems(lists[i].ID); // delete items first
            lists.splice(i, 1);          // then delete the list
        }
    }
};

function deleteListHandler(e) {
    e.stopPropagation();
    document.getElementById("delete-list-dialog").showModal();
}

const deleteList = (listID) => {
    deleteAllItems(listID);

    const index = lists.findIndex(list => list.ID === listID);

    if (index !== -1) {
        lists.splice(index, 1);
    }
}

export { lists, addNewList, showListDetails, deleteAllLists, editListHandler, editList, deleteListHandler, deleteList };