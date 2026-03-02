const toDoItems = [];

class Items {
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

export { toDoItems };