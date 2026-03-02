const projects = [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.ID = self.crypto.randomUUID();
    }
}

projects.push(new Project("Default", "This is a default project."));

export { projects };