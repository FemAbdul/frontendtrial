function showProfilePage() {
    const content = document.getElementById('content');

    // Retrieve the currentUser from localStorage with default values
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
        displayName: 'Guest',
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        score: 0,
        matchHistory: [
            { date: '2024-12-01', result: 'Win', score: 100, opponent: 'Player1', matchType: 'Ranked', duration: '15m', highlights: 'Great comeback!' },
            { date: '2024-12-05', result: 'Loss', score: 50, opponent: 'Player2', matchType: 'Casual', duration: '10m', highlights: 'Close match, lost in the last second.' }
        ], // Add dummy match history
        friends: [], // Default value for friends list
        avatar: 'images/avatar.png' // Default avatar
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
            <img id="avatar" src="${currentUser.avatar}" class="avatar">
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
            <input type="file" id="avatar-upload"  accept="image/jpeg, image/png" style="display: none;">
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
            <div class="profile-container">
            <button id="enable2FA" class="btn btn-primary">
                Enable Two-Factor Authentication
            </button>
        </div>
        </div>
    </div>
    `;
    
    // Set up the avatar-related events and profile actions
    setupAvatarEvents();
    setupProfileActions(currentUser);

    // Display the match history and friends list
    updateMatchHistoryDisplay(currentUser);
    updateFriendsListDisplay(currentUser);

    document.getElementById('enable2FA').addEventListener('click', display2FASetup);
}

function updateMatchHistoryDisplay(currentUser) {
    const matchHistoryContainer = document.getElementById('match-history');
    matchHistoryContainer.innerHTML = ''; // Clear previous history

    if (currentUser && currentUser.matchHistory && currentUser.matchHistory.length > 0) {
        currentUser.matchHistory.forEach((match, index) => {
            // Create a button for each match in the history
            const matchButton = document.createElement('button');
            matchButton.textContent = `Match ${index + 1}: ${match.date}`;
            matchButton.classList.add('match-button');

            // Append the button to the match history container
            matchHistoryContainer.appendChild(matchButton);

            // Attach event listener to show match details in a popup when the button is clicked
            matchButton.addEventListener('click', () => {
                console.log("Match button clicked", match);  // Debugging log
                showMatchDetailsPopup(match, index);
            });
        });
    }
}

function showMatchDetailsPopup(match, index) {
    console.log("Showing match details for:", match);  // Debugging log

    // Create the popup HTML structure
    const popup = document.createElement('div');
    popup.classList.add('match-details-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Match ${index + 1} Details</h3>
            <p><strong>Date:</strong> ${match.date}</p>
            <p><strong>Result:</strong> ${match.result}</p>
            <p><strong>Score:</strong> ${match.score}</p>
            <p><strong>Opponent:</strong> ${match.opponent}</p>
            <p><strong>Match Type:</strong> ${match.matchType}</p>
            <p><strong>Duration:</strong> ${match.duration}</p>
            <p><strong>Highlights:</strong> ${match.highlights}</p>
            <button id="close-popup-btn">Close</button>
        </div>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Close the popup when the close button is clicked
    document.getElementById('close-popup-btn').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// Scroll the match history section into view
document.getElementById('add-match-btn').addEventListener('click', () => {
    const matchHistorySection = document.querySelector('.match-history-container');
    matchHistorySection.scrollIntoView({ behavior: 'smooth' });
});


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
        showUsersFriends();
    });
}

function showUsersFriends() {
    // Create popup container
    const friendsPopup = document.createElement('div');
    friendsPopup.classList.add('friends-popup');

    // Add popup content
    friendsPopup.innerHTML = `
        <div class="popup-content">
            <h2>Friends</h2>
            <ul id="suggested-friends-list"></ul>
            <button id="close-friends-popup-btn">Close</button>
        </div>
    `;

    // Add popup to body
    document.body.appendChild(friendsPopup);

    // Sample friends data
    const friends = [
        { name: 'User123', status: 'online' },
        { name: 'PlayerPro', status: 'offline' },
        { name: 'GamerGirl', status: 'online' },
        { name: 'NoobSlayer', status: 'offline' },
        { name: 'Speedster', status: 'online' }
    ];

    // Get friends list container
    const suggestedFriendsList = document.getElementById('suggested-friends-list');

    // Add friends to list
    friends.forEach(friend => {
        const friendItem = document.createElement('li');
        friendItem.classList.add('friend-item');

        // Updated layout with consistent button text and always enabled
        friendItem.innerHTML = `
            <span class="friend-name">${friend.name}</span>
            <span class="status">${friend.status === 'online' ? '🟢 Online' : '🔴 Offline'}</span>
            <button class="add-friend-btn">Add Friend</button>
        `;

        // Add friend button functionality for all users
        const addButton = friendItem.querySelector('.add-friend-btn');
        addButton.addEventListener('click', () => {
            addButton.textContent = 'Friend Added';
            addButton.classList.add('added');
        });

        suggestedFriendsList.appendChild(friendItem);
    });

    // Close button functionality
    document.getElementById('close-friends-popup-btn').addEventListener('click', () => {
        document.body.removeChild(friendsPopup);
    });
}


//option 1
// function setupAvatarEvents() {
//     const avatar = document.getElementById("avatar"); // Avatar element
//     const uploadButton = document.getElementById("upload-btn"); // "Upload Photo" button
//     const avatarInput = document.getElementById("avatar-upload"); // Hidden file input
//     const MAX_FILE_SIZE = 2 * 1024 * 1024; // Maximum file size: 2MB

//     // Event listener for the "Upload Photo" button
//     uploadButton.addEventListener("click", () => {
//         avatarInput.click(); // Trigger file input click
//     });

//     // Handle file selection for avatar upload
//     avatarInput.addEventListener("change", () => {
//         if (avatarInput.files.length > 0) {
//             const file = avatarInput.files[0]; // Get the selected file

//             // Validate file type (JPEG/PNG only)
//             const allowedTypes = ["image/jpeg", "image/png"];
//             if (!allowedTypes.includes(file.type)) {
//                 alert("Please upload a JPEG or PNG image.");
//                 return; // Stop further processing
//             }

//             // Validate file size (e.g., max 2MB)
//             if (file.size > MAX_FILE_SIZE) {
//                 alert("File size exceeds 2MB. Please upload a smaller image.");
//                 return; // Stop further processing
//             }

//             const reader = new FileReader();

//             reader.onload = (e) => {
//                 avatar.src = e.target.result; // Update avatar image source
//                 localStorage.setItem('currentAvatar', e.target.result); // Save to localStorage
//                 updateAvatarInLocalStorage(e.target.result); // Update in currentUser object
//             };

//             reader.readAsDataURL(file); // Read the selected file as a data URL
//         }
//     });

//     // Load the saved avatar if it exists in localStorage
//     const savedAvatar = localStorage.getItem('currentAvatar');
//     if (savedAvatar) {
//         avatar.src = savedAvatar; // Set the avatar source to the saved image
//     }
// }

//option 2
function setupAvatarEvents() {
    const avatar = document.getElementById("avatar");
    const uploadButton = document.getElementById("upload-btn");
    const avatarInput = document.getElementById("avatar-upload");
    
    // Set accepted file types in HTML
    avatarInput.setAttribute('accept', 'image/jpeg, image/png');

    uploadButton.addEventListener("click", () => {
        avatarInput.click();
    });

    avatarInput.addEventListener("change", () => {
        if (avatarInput.files.length > 0) {
            const file = avatarInput.files[0];
            
            // Check file type
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload only JPEG or PNG files');
                avatarInput.value = ''; // Clear the input
                return;
            }

            // Check file size (e.g., 2MB max)
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 2MB');
                avatarInput.value = ''; // Clear the input
                return;
            }

            // Read and resize image before saving
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Create canvas for resizing
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set desired dimensions
                    const maxWidth = 200;
                    const maxHeight = 200;

                    // Calculate new dimensions maintaining aspect ratio
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    // Set canvas dimensions
                    canvas.width = width;
                    canvas.height = height;

                    // Draw resized image
                    ctx.drawImage(img, 0, 0, width, height);

                    // Get resized image as data URL
                    const resizedImage = canvas.toDataURL(file.type, 0.8); // 0.8 quality for JPEG

                    // Update avatar and save to localStorage
                    avatar.src = resizedImage;
                    localStorage.setItem('currentAvatar', resizedImage);
                    updateAvatarInLocalStorage(resizedImage);
                };
                img.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    });

    // Rest of your existing avatar options code
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            avatar.src = e.target.src;
            localStorage.setItem('currentAvatar', e.target.src);
            updateAvatarInLocalStorage(e.target.src);
        });
    });

    const savedAvatar = localStorage.getItem('currentAvatar');
    if (savedAvatar) {
        avatar.src = savedAvatar;
    }
}

function updateAvatarInLocalStorage(avatarSrc) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    currentUser.avatar = avatarSrc;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function setupProfileActions(currentUser) {
    document.getElementById('change-nickname-btn').addEventListener('click', () => {
        const newNickname = prompt("Enter your new nickname:", currentUser.displayName);
        if (newNickname) {
            currentUser.displayName = newNickname;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showProfilePage(); // Refresh the page
        }
    });

    document.getElementById('delete-btn').addEventListener('click', function () {
        const confirmDelete = confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            localStorage.removeItem('currentUser');
            showPage('home'); // Redirect to home page
        }
    });
}

