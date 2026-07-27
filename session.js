import { logout } from "./auth.js";

const IDLE_TIME = 60 * 60 * 1000; // 60 دقیقه

let idleTimer = null;

function resetTimer() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(async () => {

        alert("به دلیل عدم فعالیت، از حساب کاربری خارج شدید.");

        await logout();

    }, IDLE_TIME);

}

export function startSessionWatcher() {

    resetTimer();

    const events = [
        "click",
        "touchstart",
        "keydown",
        "scroll",
        "mousemove"
    ];

    events.forEach(event => {
        window.addEventListener(event, resetTimer);
    });

}

export function stopSessionWatcher() {

    clearTimeout(idleTimer);

}
