const toDoItems = [];

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
    toDoItems.push(new Item(title, description, dueDate, priority, isDone, notes, listID))
}

export { toDoItems, addNewItem };