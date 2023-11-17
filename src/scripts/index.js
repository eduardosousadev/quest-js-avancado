import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js";
import { getEvents } from "./services/events.js";

import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";

async function getUserData(userName) {
    const userResponse = await getUser(userName);
    if(screen.checkIfUserNotExist(userResponse)) return;

    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);
    
    screen.rederUser(user);
};

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPress = key === 13;
    if(isEnterKeyPress) {
        if(screen.checkIfEmptyInput(userName)) return;
        getUserData(userName);
    };
});

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(screen.checkIfEmptyInput(userName)) return;
    getUserData(userName);
});