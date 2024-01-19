'use strict';

const $HTML = document.documentElement;

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
    $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
    $HTML.dataset.theme = isDark ? "dark" : "light";
}

let isPressed = false;

const changeTheme = () => {
    isPressed = isPressed ? false : true
    $HTML.setAttribute("aria-pressed", isPressed);
    $HTML.setAttribute("data-theme", ($HTML.dataset.theme === "light") ? "dark" : "light")
    sessionStorage.setItem("theme", $HTML.dataset.theme)
}

window.addEventListener("load", () => {
    const $themeBtn = document.querySelector("[data-theme-btn]")

    $themeBtn.addEventListener("click", changeTheme)
})