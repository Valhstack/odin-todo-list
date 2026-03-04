import "./styles.css";
import { buttonsListeners } from "./scripts/listeners.js";
import { generateSideBarContent } from "./scripts/render.js";
import { addNewProject, projects } from "./scripts/projects.js";
import { addNewList } from "./scripts/lists.js";

addNewProject("Default", "This is a default project.");
const defaultProject = projects.find(obj => obj.title === "Default");

addNewList("Default", "This is a default list connected to Default project.", defaultProject.ID);

generateSideBarContent();
buttonsListeners();