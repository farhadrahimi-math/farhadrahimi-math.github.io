import { initIcons } from "../components/icons.js";
import { bindDrawerEvents } from "../components/drawer/drawerController.js";

export function initializeLayout() {

    initIcons();

    bindDrawerEvents();

}
