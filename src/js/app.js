'use strict';

import { fetchData } from './api.js'
/** 
 * @param {NodeList} $elements Nodelist
 * @param {String} eventType String
 * @param {Function} callback Function
 */


// Header scroll state

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

/**
* Work with API
*/

// Search

const $searchSubmit = document.querySelector("[data-search-submit]")

let apiUrl = "https://api.github.com/users/hriztam";
let repoUrl, followerUrl, followingUrl = "";

const searchUser = () => {
    if (!$searchField.value) return;

    apiUrl = `https://api.github.com/users/${$searchField.value}`
    updateProfile(apiUrl)
}

$searchSubmit.addEventListener("click", searchUser)

// Search when press Enter
$searchField.addEventListener("keydown", e => {
    if (e.key === "Enter") searchUser();
})

// Profile
const $profileCard = document.querySelector("[data-profile-card]");

const $repoPanel = document.querySelector("[data-repo-panel]");

const $error = document.querySelector("[data-error]");

console.log($error);
window.updateProfile = (profileUrl) => {

    $error.style.display = "none";
    document.body.style.overflowY = "visible";

    $profileCard.innerHTML = `
            <div class="profile-skeleton">
                <div class="skeleton avatar-skeleton"></div>
                <div class="skeleton title-skeleton"></div>
                <div class="skeleton text-skeleton text-1"></div>
                <div class="skeleton text-skeleton text-2"></div>
                <div class="skeleton text-skeleton text-3"></div>
            </div>
        `;

    // $tabBtns[0].click();

    $repoPanel.innerHTML = `
            <div class="card repo-skeleton">
                <div class="card-body">
                    <div class="skeleton text-skeleton text-1"></div>
                    <div class="skeleton text-skeleton text-2"></div>
                    <div class="skeleton text-skeleton text-3"></div>
                </div>

                <div class="card-footer">
                    <div class="skeleton text-skeleton"></div>
                    <div class="skeleton text-skeleton"></div>
                    <div class="skeleton text-skeleton"></div>
                </div>
            </div>
        `.repeat(6);

    // console.log(profileUrl);
    // fetchData(profileUrl)
}

// updateProfile(apiUrl);

