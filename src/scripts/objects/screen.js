const screen = {
    userProfile: document.querySelector('.profile-data'),
    rederUser(user) {
        this.userProfile.innerHTML = `
            <div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                <div class="data">
                    <h1>${user.name ?? 'Nome não cadastrado'}</h1>
                    <div class="followers-info">
                        <span><b>${user.followers}</b> Seguidores</span> 
                        <span><b>${user.following}</b> Seguindo</span>
                    </div>
                    <p>${user.bio ?? 'Bio não cadastrada' }</p>
                </div>
            </div>
        `;

        let repositoriesItens = '';
        user.repositories.forEach(repo => 
            repositoriesItens += `
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}
                        <div class="repositorie-info">
                            <p>🍴${repo.forks}</p>
                            <p>⭐${repo.stargazers_count}</p>
                            <p>👀${repo.watchers}</p>
                            <p>👨‍💻️${repo.language ?? ''}</p>
                        </div>
                    </a>
                <li/>
            `
        );
        this.userProfile.innerHTML += `
            <div class="section repositories">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens ? repositoriesItens : '<h4>Usuário sem repositórios</h4>'}</ul>
            </div>
        `
        let eventsItens = '';
        user.events.forEach(event => {
            eventsItens += `
                <li>
                    <b>${event.repo.name}</b> 
                    <span>&nbsp; - &nbsp; </span> 
                    <span>${event.payload.repository_id ? event.payload.commits[0].message : 'Sem mensagens'}</span>
                </li>
            `;
        });
        this.userProfile.innerHTML += `
            <div class="section events">
                <h2>Eventos</h2>
                <ul>${eventsItens ? eventsItens : '<h4>Usuário sem eventos</h4>'}</ul>
            </div>
        `
    },
    checkIfUserNotExist(user) {
        if(user.message === 'Not Found') {
            this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>';
            return true;
        };
    },
    checkIfEmptyInput(userName) {
        if(userName.length === 0) {
            alert('Preencha o campo com o nome do usuário do GitHub');
            return true;
        };
    }
};

export { screen };