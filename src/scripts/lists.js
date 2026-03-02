const lists = [];

class List {
    constructor(title, description, projectID) {
        this.title = title;
        this.description = description;
        this.projectID = projectID;
        this.ID = self.crypto.randomUUID();
    }
}

export { lists };