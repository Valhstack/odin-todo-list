import { generateProjectDetailsView } from "./render.js"
import { lists, deleteAllLists, addNewList } from "./lists.js";

let projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.ID = self.crypto.randomUUID();
    }
}

const addNewProject = (title, description) => {
    projects.push(new Project(title, description));
    localStorage.setItem('projects', JSON.stringify(projects));
}

if (projects.length === 0) {
    addNewProject("Default", "This is a default project.");

    if (lists.length === 0) {
        const defaultProject = projects.find(obj => obj.title === "Default");

        addNewList("Default", "This is a default list connected to Default project.", defaultProject.ID);
    }
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
    projects = JSON.parse(localStorage.getItem("projects")) || [];

    const project = projects.find(obj => obj.ID === projectID);

    project.title = title;
    project.description = description;

    localStorage.setItem('projects', JSON.stringify(projects));
};

function deleteProjectHandler(e) {
    e.stopPropagation();
    document.getElementById("delete-project-dialog").showModal();
}

const deleteProject = (projectID) => {
    projects = JSON.parse(localStorage.getItem("projects")) || [];

    deleteAllLists(projectID);

    const index = projects.findIndex(project => project.ID === projectID);

    if (index !== -1) {
        projects.splice(index, 1);
    }

    localStorage.setItem('projects', JSON.stringify(projects));
};

export { projects, addNewProject, showProjectDetails, editProject, editExistingProject, deleteProjectHandler, deleteProject };