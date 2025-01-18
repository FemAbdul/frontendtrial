function showProfilePage() {
    const content = document.getElementById('content');
    
    // Retrieve the currentUser from localStorage with default values
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        displayName: 'Guest',
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        score: 0,
        matchHistory: [] // Default value for match history
    };

    // Safeguard for undefined values in currentUser object
    const gamesPlayed = currentUser.gamesPlayed || 0;
    const wins = currentUser.wins || 0;
    const losses = currentUser.losses || 0;
    const score = currentUser.score || 0;

    content.innerHTML = `
    <div class="profile-main-container">
        <!-- Left Section -->
        <div class="profile-container">
            <h2 class="display-name">${currentUser.displayName}</h2>
            <button id="change-nickname-btn">Change Display Name</button>
            <img id="avatar" src="${currentUser.avatar || 'images/avatar.png'}" class="avatar">
            <div class="avatar-selection">
                <div class="avatar-options">
                    <img src="images/avatar1.png" class="avatar-option">
                    <img src="images/avatar2.png" class="avatar-option">
                    <img src="images/avatar3.png" class="avatar-option">
                    <img src="images/avatar4.png" class="avatar-option">
                    <img src="images/avatar5.png" class="avatar-option">
                    <img src="images/avatar6.png" class="avatar-option">
                    <img src="images/avatar7.png" class="avatar-option">
                </div>
            </div>
            <button id="upload-btn">Upload Photo</button>
            <input type="file" id="avatar-upload" style="display: none;">
            <button id="delete-btn">Delete Account</button>
        </div>

        <!-- Right Section -->
        <div class="profile-right">
            <h3>Game Statistics</h3>
            <div class="stats-container">
                <ul class="stats-list">
                    <li><strong>Games Played:</strong> <span id="games-played">${gamesPlayed}</span></li>
                    <li><strong>Total Wins:</strong> <span id="total-wins">${wins}</span></li>
                    <li><strong>Total Losses:</strong> <span id="total-losses">${losses}</span></li>
                    <li><strong>Score:</strong> <span id="total-score">${score}</span></li>
                </ul>
            </div>

            <!-- Match History Section -->
            <div class="match-history-container">
                <ul id="match-history"></ul>
                <button id="add-match-btn">View Match History</button>
            </div>

            <!-- Friends Section -->
            <div class="friends-container">
                <ul id="friends-list"></ul>
                <button id="add-friend-btn">Friends</button>
            </div>
             <!-- Enable 2FA Section -->
            <div class="two-fa-container">
                <button id="enable-2fa-btn">Enable 2FA</button>
            </div>
        </div>
    </div>
    `;
    
    // Set up the avatar-related events and profile actions
    setupAvatarEvents(currentUser);
    setupProfileActions(currentUser);

    // Display the match history
    updateMatchHistoryDisplay(currentUser);
    updateFriendsListDisplay(currentUser);

    // document.getElementById("enable-2fa-btn").addEventListener("click", () => {
    //     console.log("2FA button clicked");
    //     display2FASetup(); });
    const addFriendBtn = document.getElementById('add-friend-btn');
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', () => {
            console.log("Friends button clicked");
            showUsersFriends(currentUser); // Add actual logic here
        });
    }
    const enable2FABtn = document.getElementById("enable-2fa-btn");
    if (enable2FABtn) {
        enable2FABtn.addEventListener("click", () => {
        display2FASetup();
    });}
}


function updateMatchHistoryDisplay(currentUser) {
    const matchHistoryContainer = document.getElementById('match-history');
    matchHistoryContainer.innerHTML = ''; // Clear previous history

    // Check if the match history exists and has data
    if (currentUser && currentUser.matchHistory && currentUser.matchHistory.length > 0) {
        currentUser.matchHistory.forEach(match => {
            const matchItem = document.createElement('li');
            matchItem.innerHTML = `
                <strong>Date:</strong> ${match.date} <br>
                <strong>Result:</strong> ${match.result} <br>
                <strong>Score:</strong> ${match.score} <br>
                <strong>Opponent:</strong> ${match.opponent} <br>
                <strong>Match Type:</strong> ${match.matchType} <br>
                <strong>Duration:</strong> ${match.duration} <br>
                <strong>Highlights:</strong> ${match.highlights} <br>
            `;
            matchHistoryContainer.appendChild(matchItem);
        });
    } else {
        // If no match history, display a message
        matchHistoryContainer.textContent = 'No matches played yet.';
    }
}


// Function to update statistics after a game ends
function updateStats(win, opponent, matchType, duration, highlights) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If no user data exists in localStorage, initialize with default values
    if (!currentUser) {
        currentUser = {
            gamesPlayed: 0,
            wins: 0,
            losses: 0,
            score: 0,
            matchHistory: []
        };
    }

    // Increment games played
    currentUser.gamesPlayed += 1;

    // Update wins, losses, and score based on the game outcome
    if (win) {
        currentUser.wins += 1;
        currentUser.score += 10; // Add 10 points for a win
    } else {
        currentUser.losses += 1;
        currentUser.score -= 5; // Subtract 5 points for a loss
    }

    // Add the match result to the history
    const matchResult = {
        date: new Date().toLocaleDateString(),
        result: win ? 'Win' : 'Loss',
        score: currentUser.score,
        opponent: opponent || 'Unknown', // Default to 'Unknown' if no opponent is provided
        matchType: matchType || 'Casual', // Default to 'Casual' if no matchType is provided
        duration: duration || 'Unknown', // Default to 'Unknown' if no duration is provided
        highlights: highlights || 'None' // Default to 'None' if no highlights are provided
    };

    currentUser.matchHistory.push(matchResult);

    // Save updated stats and match history to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Call the function to update the profile page in real-time
    updateMatchHistoryDisplay(currentUser);
}


// Set up avatar-related functionality
// function setupAvatarEvents() {

    // const avatar = document.getElementById("avatar");
    // const uploadButton = document.getElementById("upload-btn");
    // const avatarInput = document.getElementById("avatar-upload");

    // uploadButton.addEventListener("click", () => {
    //     avatarInput.click();
    // });

    // avatarInput.addEventListener("change", () => {
    //     if (avatarInput.files.length > 0) {
    //         const file = avatarInput.files[0];
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             avatar.src = e.target.result;
    //             localStorage.setItem('currentAvatar', e.target.result);
    //             updateAvatarInLocalStorage(e.target.result); // Update in LocalStorage
    //         };

    //         reader.readAsDataURL(file);
    //     }
    // });

    // const avatarOptions = document.querySelectorAll('.avatar-option');
    // avatarOptions.forEach(option => {
    //     option.addEventListener('click', (e) => {
    //         avatar.src = e.target.src;
    //         localStorage.setItem('currentAvatar', e.target.src);
    //         updateAvatarInLocalStorage(e.target.src); // Update in LocalStorage
    //     });
    // });

    // const savedAvatar = localStorage.getItem('currentAvatar');
    // if (savedAvatar) {
    //     avatar.src = savedAvatar;
    // }
// }

// Update avatar in localStorage
// function updateAvatarInLocalStorage(avatarSrc) {
    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (currentUser) {
        // currentUser.avatar = avatarSrc;
        // localStorage.setItem('currentUser', JSON.stringify(currentUser));
    // }
// }

function setupAvatarEvents(currentUser) {
    const avatar = document.getElementById("avatar");
    const uploadButton = document.getElementById("upload-btn");
    const avatarInput = document.getElementById("avatar-upload");

    if (!currentUser || !currentUser.token) {
        console.error("User not authenticated");
        return;
    }

    // Handle avatar upload
    uploadButton.addEventListener("click", () => {
        avatarInput.click();
    });

    avatarInput.addEventListener("change", async () => {
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                const response = await fetch('http://127.0.0.1:8000/upload-avatar/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`, // Add the JWT token
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    avatar.src = data.avatar_url; // Update the avatar on the page
                    updateAvatarInLocalStorage(data.avatar_url, currentUser); // Save the URL in localStorage
                    alert('Avatar updated successfully!');
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update avatar'}`);
                }
            } catch (error) {
                console.error("Error uploading avatar:", error);
                alert('An error occurred while uploading the avatar.');
            }
        }
    });

    // Handle avatar selection from predefined options
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', async (e) => {
            const selectedAvatarPath = e.target.src.split('/').slice(-2).join('/'); // Send relative path to the backend

            try {
                const response = await fetch('http://127.0.0.1:8000/update-avatar/', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.token}`, // Add the JWT token
                    },
                    body: JSON.stringify({ avatar: selectedAvatarPath }), // Send the path to the backend
                });

                if (response.ok) {
                    const data = await response.json();
                    avatar.src = data.avatar_url; // Update the avatar on the page
                    updateAvatarInLocalStorage(data.avatar_url, currentUser); // Save the URL in localStorage
                    alert('Avatar updated successfully!');
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update avatar'}`);
                }
            } catch (error) {
                console.error("Error updating avatar:", error);
                alert('An error occurred while updating the avatar.');
            }
        });
    });

    // Initialize avatar from localStorage or default value
    const savedAvatar = currentUser.avatar || localStorage.getItem('currentAvatar');
    if (savedAvatar) {
        avatar.src = savedAvatar;
    }
}

// Update avatar in localStorage
function updateAvatarInLocalStorage(avatarSrc, currentUser) {
    currentUser.avatar = avatarSrc;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Set up other profile actions
function setupProfileActions(currentUser) {
    document.getElementById('change-nickname-btn').addEventListener('click', async () => {
        const newNickname = prompt("Enter your new nickname:", currentUser.displayName);
        if (newNickname && newNickname !== currentUser.displayName) {
            try {
                // Send an authenticated request to the backend
                const response = await fetch('http://127.0.0.1:8000/changedisplayname/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.token}` // Attach JWT token
                    },
                    body: JSON.stringify({ display_name: newNickname })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Update the display name locally
                    currentUser.displayName = data.display_name;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    showProfilePage(); // Refresh the page
                    alert('Display name updated successfully!');
                } else {
                    // Handle errors from the backend
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to update display name'}`);
                }
            } catch (error) {
                console.error('Error updating display name:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    });

     // Handle account deletion
     document.getElementById('delete-btn').addEventListener('click', async () => {
        const confirmDelete = confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                const response = await fetch('http://127.0.0.1:8000/deleteaccount/', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`, // Attach JWT token
                    },
                });

                if (response.ok) {
                    alert('Account deleted successfully.');
                    localStorage.removeItem('currentUser');
                    showPage('home'); // Redirect to home
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.error || 'Failed to delete account'}`);
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    });
}

// Update statistics dynamically
function updateStats(win)
{
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        score: 0,
    };

    currentUser.gamesPlayed += 1;

    if (win) {
        currentUser.wins += 1;
        currentUser.score += 10; // Add 10 points for a win
    } else {
        currentUser.losses += 1;
        currentUser.score -= 5; // Subtract 5 points for a loss
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // Update the displayed statistics in real-time
    document.getElementById('games-played').textContent = currentUser.gamesPlayed;
    document.getElementById('total-wins').textContent = currentUser.wins;
    document.getElementById('total-losses').textContent = currentUser.losses;
    document.getElementById('total-score').textContent = currentUser.score;
}

function updateFriendsListDisplay(currentUser) {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = ''; // Clear previous list

    if (currentUser && currentUser.friends && currentUser.friends.length > 0) {
        currentUser.friends.forEach((friend) => {
            const friendItem = document.createElement('li');
            friendItem.textContent = friend;
            friendsList.appendChild(friendItem);
        });
    }
    document.getElementById('add-friend-btn').addEventListener('click', () => {
        console.log('Friends button clicked');
        console.log('Current User:', currentUser); // Debu
        showUsersFriends(currentUser);
    });
}

function showUsersFriends(currentUser) {
    // Create popup container
    const friendsPopup = document.createElement('div');
    friendsPopup.classList.add('friends-popup');

    // Add popup content
    friendsPopup.innerHTML = `
        <div class="popup-content">
            <h2>Friends</h2>
            <ul id="suggested-friends-list"></ul>
            <p id="empty-message" style="display: none;">No online users or friends to display.</p>
            <button id="close-friends-popup-btn">Close</button>
        </div>
    `;
    // console.error(currentUser);
    // Add popup to body
    document.body.appendChild(friendsPopup);
    // if (!currentUser || !currentUser.token) {
    //     console.error("User not authenticated");
    //     return;
    // }
    // const token = localStorage.getItem("token");
    // if (!token) {
    //     alert("Please log in to view friends.");
    //     return;
    // }


    // Fetch online users and all friends from backend
    fetch('http://127.0.0.1:8000/get-onlineusers/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${currentUser.token}` } // Authenticated request
    })
    .then(response => response.json())
    .then(data => {
        const suggestedFriendsList = document.getElementById('suggested-friends-list');
        suggestedFriendsList.innerHTML = ''; // Clear the list
        
        // Iterate through the list of online users and friends
        data.users.forEach(user => {
            const friendItem = document.createElement('li');
            friendItem.classList.add('friend-item');

            if (user.is_friend) {
                // If the user is a friend, show the "Friend" button (disabled)
                friendItem.innerHTML = `
                    <span class="friend-name">${user.display_name}</span>
                    <span class="status">${user.online_status === 'online' ? '🟢 Online' : '🔴 Offline'}</span>
                    <button class="friend-btn added" disabled>Friend</button>
                `;
            } else if (user.online_status === 'online') {
                // If the user is online but not a friend, show the "Add Friend" button
                friendItem.innerHTML = `
                    <span class="friend-name">${user.display_name}</span>
                    <span class="status">🟢 Online</span>
                    <button class="add-friend-btn">Add Friend</button>
                `;

                // Add event listener to the "Add Friend" button
                const addButton = friendItem.querySelector('.add-friend-btn');
                addButton.addEventListener('click', () => {
                    addFriend(currentUser, user.id, addButton);
                });
            }

            suggestedFriendsList.appendChild(friendItem);
        });
    })
    .catch(error => {
        console.error('Error fetching online users and friends:', error);
    });

    // Close button functionality
    document.getElementById('close-friends-popup-btn').addEventListener('click', () => {
        if (document.body.contains(friendsPopup)) {
            document.body.removeChild(friendsPopup); // Remove popup from DOM
        }
    });
}

// Function to handle the "Add Friend" button
function addFriend(currentUser, friendId, addButton) {
    fetch('http://127.0.0.1:8000/add_friend/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify({ friend_id: friendId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            addButton.textContent = 'Friend Added';
            addButton.classList.add('added');
            addButton.disabled = true;
        } else if (data.error) {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Error adding friend:', error);
    });
}