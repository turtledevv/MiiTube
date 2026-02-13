import { users } from "/assets/data/users.js"

const profileList = document.getElementById('profileList');

// simple. just grab the user list and then add the profile card.
users.forEach(user => {
    if (user.hidden) return;

    const card = document.createElement('div');
    let verified = '<span style="padding: 3px;"></span>';
    card.className = 'profile-card';
    if (user.verified === true) {
        verified = `
            <div style="display: inline; padding: 3px; text-align: center;">
                <span style="font-size: 15px; font-family: 'Miiverse Symbols'; color: limegreen;">v</span>
            </div>
        `;
    }
    card.innerHTML = `
        <a href="${user.youtube}" target="_blank"><img src="${user.profilePic}" alt="${user.name}"></a>
        <div class="profile-info">
            <a href="${user.youtube}" target="_blank">${user.name}</a>${verified}<span class="username">(@${user.username})</span>
            <p>${user.description}</p>
        </div>
    `;
    profileList.appendChild(card);
});
