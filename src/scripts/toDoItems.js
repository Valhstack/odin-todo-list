let toDoItems = localStorage.getItem('toDoItems') ? JSON.parse(localStorage.getItem('toDoItems')) : [];

class Item {
    constructor(title, description, dueDate, priority, isDone, notes, listID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
        this.notes = notes;
        this.listID = listID;
        this.ID = self.crypto.randomUUID();
    }
}

const addNewItem = (title, description, dueDate, priority, isDone, notes, listID) => {
    toDoItems.push(new Item(title, description, dueDate, priority, isDone, notes, listID));
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
};

const editExistingItem = (title, description, dueDate, priority, notes, itemID) => {
    toDoItems = JSON.parse(localStorage.getItem("toDoItems")) || [];

    const task = toDoItems.find(obj => obj.ID === itemID);

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.notes = notes;

    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
};

const deleteItem = (itemID) => {
    toDoItems = JSON.parse(localStorage.getItem("toDoItems")) || [];

    const index = toDoItems.findIndex(item => item.ID === itemID);

    if (index !== -1) {
        toDoItems.splice(index, 1);
    }

    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
};

const deleteAllItems = (listID) => {
    toDoItems = JSON.parse(localStorage.getItem("toDoItems")) || [];

    for (let i = toDoItems.length - 1; i >= 0; i--) {
        if (toDoItems[i].listID === listID) {
            toDoItems.splice(i, 1);
        }
    }

    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
};

function showTaskDetails(e) {
    if (e.target.closest(".task-checkbox")) return;

    const currentDiv = e.currentTarget;
    const currentDetails = currentDiv.querySelector(".task-details-outer-wrapper");

    const selectedDiv = document.querySelector('.todo-item-wrapper[data-selected="true"]');

    // If clicking the already open item → close it
    if (selectedDiv === currentDiv) {
        currentDiv.removeAttribute("data-selected");
        currentDetails.classList.add("inactive");
        return;
    }

    // Close previously opened item
    if (selectedDiv) {
        const oldDetails = selectedDiv.querySelector(".task-details-outer-wrapper");
        oldDetails.classList.add("inactive");
        selectedDiv.removeAttribute("data-selected");
    }

    // Open clicked item
    currentDiv.dataset.selected = "true";
    currentDetails.classList.remove("inactive");
}

function editTask(e) {
    e.stopPropagation();
    const taskID = this.closest(".task-details-outer-wrapper").id;

    document.getElementById("save-task-btn").value = "save-edit";

    document.getElementById("add-task-dialog").showModal();

    const task = toDoItems.find(obj => obj.ID === taskID);

    document.getElementById("task_title").value = task.title;
    document.getElementById("task_description").value = task.description;
    document.getElementById("task_dueDate").value = task.dueDate;
    document.getElementById("task_priority").value = task.priority;
    document.getElementById("task_notes").value = task.notes;
}

function deleteTask(e) {
    e.stopPropagation();
    document.getElementById("delete-task-dialog").showModal();
}

export { toDoItems, addNewItem, showTaskDetails, editTask, editExistingItem, deleteItem, deleteTask, deleteAllItems };