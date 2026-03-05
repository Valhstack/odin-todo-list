import { generateProjectDetailsView } from "./render.js"
import { deleteAllLists } from "./lists.js";

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

function editProject(e) {
    e.stopPropagation();
    const projectID = document.querySelector('.project-btn[data-selected="true"]').dataset.id;

    document.getElementById("save-btn").value = "save-edit";

    document.getElementById("add-project-dialog").showModal();

    const project = projects.find(obj => obj.ID === projectID);

    document.getElementById("project_title").value = project.title;
    document.getElementById("project_description").value = project.description;
}

const editExistingProject = (title, description, projectID) => {
    const project = projects.find(obj => obj.ID === projectID);

    project.title = title;
    project.description = description;
};

function deleteProjectHandler(e) {
    e.stopPropagation();
    document.getElementById("delete-project-dialog").showModal();
}

const deleteProject = (projectID) => {
    deleteAllLists(projectID);

    const index = projects.findIndex(project => project.ID === projectID);

    if (index !== -1) {
        projects.splice(index, 1);
    }
};

export { projects, addNewProject, showProjectDetails, editProject, editExistingProject, deleteProjectHandler, deleteProject };