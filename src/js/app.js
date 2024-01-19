'use strict';

/**
 * @param {NodeList} $elements Nodelist
 * @param {String} eventType String
 * @param {Function} callback Function
 */


// Header scroll state
window.addEventListener("DOMContentLoaded", () => {
    const $header = document.querySelector("[data-header]")
    const $searchToggler = document.querySelector("[data-search-toggler]")
    const $searchField = document.querySelector("[data-search-field]")
    let isExpanded = false;

    window.addEventListener("scroll", () => {
        $header.classList[window.scrollY > 50 ? "add" : "remove"]("active");
    })

    $searchToggler.addEventListener("click", () => {
        $header.classList.toggle("search-active");
        isExpanded = isExpanded ? false : true;
        $searchToggler.setAttribute("aria-expanded", isExpanded);
        $searchField.focus();
    })
})



