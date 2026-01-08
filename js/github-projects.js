const latestProjectContainer = document.querySelector('#latest-project')
const loadingState = document.querySelector('.loading')
const gitHubApiUrl = 'https://api.github.com/users/Lesstread666/repos?sort=created&direction=desc'

const getData = async (url, errorMessage = 'Something went wrong') => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${errorMessage} (${response.status})`);
    }
    return response.json();
};

const fetchLatestProject = async () => {
    loadingState.classList.remove('hidden')

    try {
        const repos = await getData(gitHubApiUrl)

        const latestRepo = repos[0]

        latestProjectContainer.innerHTML = `
             <h2>Latest Project</h2>

    <h3>${latestRepo.name}</h3>
    <p>${latestRepo.description || 'No description provided.'}</p>

    ${latestRepo.homepage ? `
        <div class="demo-preview">
            <iframe src="${latestRepo.homepage}"></iframe>
        </div>
    ` : `<p>No live demo available.</p>`}

    <a href="${latestRepo.html_url}" target="_blank">GitHub</a>
    ${latestRepo.homepage ? ` | <a href="${latestRepo.homepage}" target="_blank">Live Demo</a>` : ''}
        `

    } catch (error) {
        latestProjectContainer.innerHTML = `
            <h2>Latest Project</h2>
            <p>${error.message}</p>
        `
    } finally {
        loadingState.classList.add('hidden')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetchLatestProject();
})

