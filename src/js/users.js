const USERS_URL = 'https://api.github.com/users';

const loginEl = document.querySelector('#user-login');
const btnEl = document.querySelector('#btn');
const findUser = document.querySelector('#findUser');
const dataWrap = document.querySelector('#user-data-wrap');
let lastUserId = null;

const onBtnClick = () => {
    fetch(USERS_URL)
        .then((res) => {
            if (!res.ok) {
                throw Error(res.status);
            }
            return res.json();
        })
        .then((data) => {
            const sortData = sortUsers(data);
            showUsersData(sortData);
        })
        .catch((err) => alert(err));
};

const onFindUserClick = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${USERS_URL}/${lastUserId}`);
    xhr.send();
    xhr.onload = () => {
        xhr.status != 200
            ? alert(`${xhr.status}: ${xhr.statusText}`)
            : showUserData(JSON.parse(xhr.response));
    };
    xhr.onerror = (err) => alert(err)
}

btnEl.addEventListener('click', onBtnClick);
findUser.addEventListener('click', onFindUserClick);

const sortUsers = (users) => {
    return users.sort((a, b) => a.id > b.id ? 1 : -1)
}

const showUsersData = (users) => {
    findUser.classList.remove('hidden');
    dataWrap.innerHTML = '';
    lastUserId = users[users.length - 1].id;
    users.forEach(user => {
        dataWrap.insertAdjacentHTML('beforeend', 
                            `<div>
                                <img src="${user.avatar_url}">
                                <a href="${user.html_url}">${user.login}</a>
                                <p> Id: ${user.id}</p>
                                <p> Type: ${user.type} </p>
                            </div>`
    )});
    
};

const showUserData = (user) => {
    dataWrap.innerHTML = '';
    dataWrap.insertAdjacentHTML('beforeend', 
                            `<div>
                                <img src="${user.avatar_url}">
                                <a href="${user.html_url}">${user.login}</a>
                                <p> Id: ${user.id}</p>
                                <p> Type: ${user.type} </p>
                            </div>`
    );
};