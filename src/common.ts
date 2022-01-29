import './css/index.less';
import {domReady} from "./app/dom";
import {DarkMode} from "./app/darkmode";

domReady().then(() => {
    const darkMode = new DarkMode();
    darkMode.init();
    const darkModeButton = document.getElementById('dark-light-mode');
    if(darkModeButton){
        darkModeButton.addEventListener('click', () => darkMode.toggle());
    }
});