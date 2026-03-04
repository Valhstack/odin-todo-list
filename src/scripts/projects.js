import { generateProjectDetailsView } from "./render.js"

const projects = [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.ID = self.crypto.randomUUID();
    }
}

const addNewProject = (title, description) => {
    projects.push(new Project(title, description));
}

function showProjectDetails(e) {
    const currentBtn = e.currentTarget;
    const selectedBtn = document.querySelector('.project-btn[data-selected="true"]');

    if (selectedBtn && selectedBtn !== currentBtn) {
        selectedBtn.removeAttribute("data-selected");
    }

    currentBtn.dataset.selected = "true";

    const projectID = e.currentTarget.dataset.id;
    generateProjectDetailsView(projectID);
}

export { projects, addNewProject, showProjectDetails };