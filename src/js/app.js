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
const $repoPagination = document.querySelector("[repo-pagination]");

const $error = document.querySelector("[data-error]");

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
    fetchData(profileUrl, data => {

        const {
            type,
            avatar_url,
            name,
            login: username,
            html_url: githubPage,
            bio,
            location,
            blog: website,
            twitter_username,
            public_repos,
            followers,
            following,
            followers_url,
            following_url,
            repos_url
        } = data

        repoUrl = repos_url;
        followerUrl = followers_url;
        followingUrl = following_url.replace("{/other_user}", "");

        $profileCard.innerHTML = `
            <figure
                class=${type === "User" ? "avatar-circle" : "avatar-rounded"}  img-holder"
                style="--width: 280; --height: 280"
            >
                <img
                src="${avatar_url}"
                alt="${username}"
                width="280"
                height="280"
                class="img-cover"
                />
            </figure>

            ${name ?
                `<h1 class="title-2">${name}</h1>` : ""
            }

            <p class="username text-primary">${username}</p>

            ${bio ?
                `<p class="bio">${bio}</p>` : ""
            }

            <a href="${githubPage}" target="_blank" class="btn btn-secondary">
                <span class="material-symbols-rounded" aria-hidden="true"
                >open_in_new</span
                >

                <span class="span">See on Github</span>
            </a>

            <ul class="profile-meta">
            
            ${location ?
                `<li class="meta-item">
                    <span class="material-symbols-rounded" 
                    aria-hidden="true">location_on</span>
                    <span class="meta-text">${location}</span>
                </li>` : ""
            }
            ${website ?
                `<a href="${website} target="_blank" class="meta-item">
                    <span class="material-symbols-rounded" 
                    aria-hidden="true">captive_portal</span>
                    <span class="meta-text">${website.replace("https://", "")}</span>
                </a>` : ""
            }
            ${twitter_username != null ?
                `<li class="meta-item">
                    <span class="icon" aria-hidden="true">
                        <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M19.9441 7.92638C19.9568 8.10403 19.9568 8.28173 19.9568 8.45938C19.9568 13.8781 15.8325 20.1218 8.29441 20.1218C5.97207 20.1218 3.81473 19.4492 2 18.2817C2.32996 18.3198 2.64719 18.3325 2.98984 18.3325C4.90605 18.3325 6.67004 17.6853 8.07867 16.5812C6.27664 16.5431 4.76648 15.3629 4.24617 13.7386C4.5 13.7766 4.75379 13.802 5.02031 13.802C5.38832 13.802 5.75637 13.7512 6.09898 13.6624C4.22082 13.2817 2.81215 11.632 2.81215 9.63958V9.58884C3.35781 9.89341 3.99238 10.0838 4.66492 10.1091C3.56086 9.37306 2.83754 8.11673 2.83754 6.6954C2.83754 5.93399 3.04055 5.23603 3.3959 4.62688C5.41367 7.11419 8.44668 8.73853 11.8477 8.91622C11.7842 8.61165 11.7461 8.29442 11.7461 7.97716C11.7461 5.71825 13.5736 3.87817 15.8451 3.87817C17.0253 3.87817 18.0913 4.3731 18.84 5.17259C19.7664 4.99493 20.6547 4.65228 21.4416 4.18274C21.137 5.13454 20.4898 5.93403 19.6395 6.44161C20.4644 6.35282 21.2639 6.12435 21.9999 5.80712C21.4416 6.61927 20.7436 7.34259 19.9441 7.92638Z"
                            fill="var(--on-background)"
                        ></path>
                        </svg>
                    </span>
                    <span class="meta-text">
                        <a href="https://twitter.com/${twitter_username}" target="_blank" 
                        class="meta-item">@${twitter_username}</a>
                    </span>
                </li>` : ""
            }
                
            </ul>

            <ul class="profile-stats">
                <li class="stats-item"><span class="body">${public_repos}</span>Repos</li>
                <li class="stats-item"><span class="body">${followers}</span>Followers</li>
                <li class="stats-item"><span class="body">${following}</span>Following</li>
            </ul>
        `

        updateRepository();
    }, () => {
        $error.style.display = "grid";
        document.body.style.overflowY = "hidden";

        $error.innerHTML = `
            <p class="title-1">Oops! :(</p>
            <p class="text">There is no account with this username</p>
        `
    });
}

updateProfile(apiUrl);

// Repository
// Add these variables to keep track of pagination state
let currentPage = 1;
let repositoriesPerPage = 10; // Default value, you can change it as needed
const maxRepositoriesPerPage = 100;

const updateRepository = () => {

    fetchData(`${repoUrl}`, (data) => {

        $repoPanel.innerHTML = `<h2 class="sr-only">Repositories</h2>`;

        const repositories = data.filter(i => !i.fork);

        const totalPages = Math.ceil(repositories.length / repositoriesPerPage);

        updatePagination(totalPages);

        // Calculate the start and end index based on the current page
        const startIndex = (currentPage - 1) * repositoriesPerPage;
        const endIndex = startIndex + repositoriesPerPage;

        // Display repositories for the current page
        const repositoriesForPage = repositories.slice(startIndex, endIndex);

        if (repositories.length) {
            for (let repo of repositoriesForPage) {

                const {
                    name,
                    html_url,
                    description,
                    private: isPrivate,
                    language,
                    stargazers_count: stars,
                    forks_count
                } = repo;

                const $repoCard = document.createElement("article")
                $repoCard.classList.add("card", "repo-card")

                $repoCard.innerHTML = `
                    <div class="card-body">
                        <a href="${html_url}" target="_blank" class="card-title">
                        <h3 class="title-3">${name}</h3>
                        </a>
                        ${description ?
                        `<p class="card-text">${description}</p>` : ""
                    }
                        

                        <span class="badge">${isPrivate ? "Private" : "Public"}</span>

                    </div>

                    <div class="card-footer">
                    ${language ?
                        ` <div class="meta-item">
                        <span class="material-symbols-rounded" aria-hidden="true"
                            >code_blocks</span
                        >
                        <span class="span">${language}</span>
                        </div>` : ""
                    }
                        <div class="meta-item">
                        <span class="material-symbols-rounded" aria-hidden="true"
                            >star_rate</span
                        >
                        <span class="span">${stars}</span>
                        </div>
                        <div class="meta-item">
                        <span class="material-symbols-rounded" aria-hidden="true"
                            >family_history</span
                        >
                        <span class="span">${forks_count}</span>
                        </div>
                    </div>
                `

                $repoPanel.appendChild($repoCard);
            }
        } else {
            $repoPanel.innerHTML = `
                <div class="error-content">
                    <p class="title-1">Oops! :(</p>
                    <p class="text">Doesn't have any public repositories yet</p>
                </div>
            `
        }
    })
}
const updatePagination = (totalPages) => {
    $repoPagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const $paginationLink = document.createElement("a");
        $paginationLink.href = "#";
        $paginationLink.classList.add("pagination-link");
        $paginationLink.textContent = i;

        // Add event listener to each pagination link
        $paginationLink.addEventListener("click", () => {
            currentPage = i;
            updateRepository();
        });

        if (i === currentPage) {
            $paginationLink.classList.add("active");
        }

        $repoPagination.appendChild($paginationLink);
    }
};

const updateRepositoriesPerPage = (value) => {
    repositoriesPerPage = parseInt(value);
    updateRepository();
};

// Add an event listener for the dropdown to choose repositories per page
const $repositoriesPerPageDropdown = document.querySelector("[data-drop-down]")

$repositoriesPerPageDropdown.addEventListener("change", (event) => {
    updateRepositoriesPerPage(event.target.value);
});

updateRepository();