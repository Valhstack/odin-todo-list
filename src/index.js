import "./styles.css";
import { buttonsListeners } from "./scripts/listeners.js";
import { generateSideBarContent } from "./scripts/render.js";
import { addNewProject, projects } from "./scripts/projects.js";
import { addNewList, lists } from "./scripts/lists.js";
import { addNewItem } from "./scripts/toDoItems.js";

addNewProject("Default", "This is a default project.");
const defaultProject = projects.find(obj => obj.title === "Default");

addNewList("Default", "This is a default list connected to Default project.", defaultProject.ID);
const defaultList = lists.find(obj => obj.title === "Default");

addNewItem("Task 1", "-", "2026-03-07", "Medium", false, "-", defaultList.ID);

generateSideBarContent();
buttonsListeners();