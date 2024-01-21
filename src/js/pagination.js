import { fetchData } from './api.js'

const express = require('express');
const app = express();

const repositories = []; // Your array of repositories

// Route to handle paginated requests
app.get('/repositories', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const reposPerPage = parseInt(req.query.reposPerPage) || 10;

    const startIndex = (page - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    const paginatedRepos = repositories.slice(startIndex, endIndex);

    // Send the paginated repositories as a response
    res.json({ repositories: paginatedRepos, currentPage: page });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
