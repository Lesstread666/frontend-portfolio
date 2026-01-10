const latestProjectContainer = document.querySelector('#latest-project')
const loadingState = document.querySelector('.loading')
const gitHubApiUrl = 'https://api.github.com/users/Lesstread666/repos?sort=created&direction=desc'

//Change the format for the project name (upperCase and replacing - to space)
const formatRepoName = (name) => {
    return name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}

//Error message 
const getData = async (url, errorMessage = 'Something went wrong') => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
};

//Function to show the latest project
const fetchLatestProject = async () => {
    loadingState.classList.remove('hidden')

    try {
        const repos = await getData(gitHubApiUrl)

        const latestRepo = repos[0]
        //Name, description, demo, links
        latestProjectContainer.innerHTML = `
    <h3>${formatRepoName(latestRepo.name)}</h3>
    <p>${latestRepo.description || 'No description provided.'}</p>

    ${latestRepo.homepage ? `
        <div class="demo-preview">
            <iframe src="${latestRepo.homepage}"></iframe>
        </div>
    ` : `<p>No live demo available.</p>`}

    <a href="${latestRepo.html_url}" target="_blank">GitHub</a>
    ${latestRepo.homepage ? ` | <a href="${latestRepo.homepage}" target="_blank">Live Demo</a>` : ''}
        `
        //Replace them with some comment if not available
    } catch (error) {
        latestProjectContainer.innerHTML = `
            <h2>Latest Project</h2>
            <p>${error.message}</p>
        `
        //Loading state 
    } finally {
        loadingState.classList.add('hidden')
    }
}
//Call and show the function (latest project)
window.addEventListener('DOMContentLoaded', () => {
    fetchLatestProject();
})

