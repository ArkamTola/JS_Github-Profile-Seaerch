const APIURL = 'https://api.github.com/users/';


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username){

    try{

        const {data} = await axios(APIURL + username);
        
        createUserCrad(data);
        getRepos(username);

    }catch(err){
        if(err.response.status == 404){
            createErrorcard('No Profile with this UserName !!');
        }
    }
}


async function getRepos(username){

    try{

        const {data} = await axios(APIURL + username + `/repos?sort=created`);
        addReposToCcard(data);
        
    }catch(err){
        
        createErrorcard('Problem Fetching Repos');
        
    }

}

function createUserCrad(user){
    const cardHTML = `
    <div class="card">

            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>

            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                    <li>${user.followers} <strong>Followers</strong></li>
                    <li>${user.following} <strong>Following</strong></li>
                    <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>

            </div>
        </div>
    `

    main.innerHTML = cardHTML;
}

function createErrorcard(msg){
    const cardHTML = `
        <div class = "card">
            <h1>${msg}</h1>
        </div>
    `
    main.innerHTML = cardHTML;
}

function addReposToCcard(repos){
    const reposEl = document.getElementById('repos');

    repos.slice(0,5).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target - '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })
}


form.addEventListener("submit", (e) => {

    e.preventDefault();

    const user = search.value;

    if(user){

        getUser(user);

        search.value ="";

    }
});