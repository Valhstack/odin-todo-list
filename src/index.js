import "./styles.css";
import { buttonsListeners } from "./scripts/listeners.js";
import { generateSideBarContent } from "./scripts/render.js";
import { projects } from "./scripts/projects.js";

generateSideBarContent();
buttonsListeners();