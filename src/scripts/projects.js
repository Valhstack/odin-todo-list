import { generateSideBarContent } from "./render.js"

const projects = [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.ID = self.crypto.randomUUID();
    }
}

projects.push(new Project("Default", "This is a default project."));

const addNewProject = (title, description) => {
    projects.push(new Project(title, description));
}

const attachListeners = (btns) => {
    for (let btn of btns) {
        btn.addEventListener("click", showProjectDetails);
    }
}

function showProjectDetails(e) {

}

export { projects, addNewProject, attachListeners };