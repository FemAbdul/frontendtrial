// // Show the correct page
// function showPage(page) {
//     const content = document.getElementById('content');
  

//     switch (page) {
//         case 'home':
//             content.innerHTML = `
//                 <div id="home" class="page">
//                     <h1 class="welcome-title">Welcome to Pong Game</h1>
//                     <a href="#" class="btn btn-primary btn-lg" onclick="showPage('login')">Get Started</a>
//                 </div>`;
//             updateNavbar('loggedOut');
//             break;

//         case 'login':
//             showLoginPage();
//             break;

//         case 'register':
//             showRegisterPage();
//             break;

//         case 'dashboard':
//             content.innerHTML = `
//                 <div id="dashboard" class="page">
                    
//                 </div>`;
//             updateNavbar('loggedIn');
//             break;

//         case 'game':
//             showGames();  // Call the showGames function here
//             updateNavbar('loggedIn');
//             break;
//         case 'profile':
//                 showProfilePage();
//                 updateNavbar('loggedIn');
//                 break;


//         default:
//             content.innerHTML = `<p>Page not found!</p>`;
//     }
// }

// function updateNavbar(status) {
//     const navbarLinks = document.getElementById('navbar-links');
//     if (status === 'loggedIn') {
//         navbarLinks.innerHTML = `
//             <li class="nav-item mx-3"><a class="nav-link" href="#" onclick="showPage('game')">Games</a></li>
//             <li class="nav-item mx-3"><a class="nav-link" href="#" onclick="showPage('leaderboard')">Leaderboard</a></li>
//             <li class="nav-item mx-3"><a class="nav-link" href="#" onclick="showPage('profile')">Profile</a></li>
//             <li class="nav-item mx-3"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
//         `;
//         navbarLinks.classList.add('justify-content-between');
//     } else {
//         navbarLinks.innerHTML = `
//             <li class="nav-item"><a class="nav-link" href="#" onclick="showPage('home')">Home</a></li>
//             <li class="nav-item"><a class="nav-link" href="#" onclick="showPage('login')">Login</a></li>
//         `;
//     }
// }

// // Get the logged-in user's avatar
// function getUserAvatar() {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     return currentUser ? `images/${currentUser.avatar}` : 'images/avatar.png'; // Update this path
// }

// function logout() {
//     localStorage.removeItem('currentUser');
//     showPage('home');
// }

// // Show home page by default
// showPage('home');











// function showPage(page, pushHistory = true) {
//     const content = document.getElementById('content');

//     // Update browser history if needed
//     if (pushHistory) {
//         history.pushState({ page }, '', `#${page}`);
//     }

//     switch (page) {
//         case 'home':
//             content.innerHTML = `
//                 <div id="home" class="page">
//                     <h1 class="welcome-title">Welcome to Pong Game</h1>
//                     <a href="#" class="btn btn-primary btn-lg" data-page="login">Get Started</a>
//                 </div>`;
//             setupPageLinks();
//             updateNavbar('loggedOut');
//             break;

//         case 'login':
//             showLoginPage();
//             break;

//         case 'register':
//             showRegisterPage();
//             break;

//         case 'dashboard':
//             showDashboard();
//             break;

//         case 'game':
//             showGames();
//             updateNavbar('loggedIn');
//             break;

//         case 'profile':
//             showProfilePage();
//             updateNavbar('loggedIn');
//             break;

//         default:
//             content.innerHTML = `<p>Page not found!</p>`;
//     }
// }
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function showPage(page, pushHistory = true) {
    const content = document.getElementById('content');
    
    // Define protected pages that require login
    const protectedPages = ['dashboard', 'game', 'profile', 'chat', 'leaderboard'];
    
    // Check if trying to access protected page while logged out
    if (protectedPages.includes(page) && !isLoggedIn()) {
        content.innerHTML = `
            <div class="alert alert-warning text-center mt-5">
                Please login to access this page
                <br>
                <a href="#" class="btn btn-primary mt-3" data-page="login">Go to Login</a>
            </div>
        `;
        setupPageLinks();
        updateNavbar('loggedOut');
        return;
    }

    // Update browser history if needed
    if (pushHistory) {
        history.pushState({ page }, '', `#${page}`);
    }

    switch (page) {
        case 'home':
            content.innerHTML = `
                <div id="home" class="page">
                    <h1 class="welcome-title">Welcome to Pong Game</h1>
                    <a href="#" class="btn btn-primary btn-lg" data-page="login">Get Started</a>
                </div>`;
            setupPageLinks();
            updateNavbar('loggedOut');
            break;

        case 'login':
            showLoginPage();
            break;

        case 'register':
            showRegisterPage();
            break;

        case 'dashboard':
            showDashboard();
            break;

        case 'game':
            showGames();
            updateNavbar('loggedIn');
            break;

        case 'profile':
            showProfilePage();
            updateNavbar('loggedIn');
            break;

        default:
            content.innerHTML = `<p>Page not found!</p>`;
    }
}

function updateNavbar(status) {
    const navbarLinks = document.getElementById('navbar-links');
    if (status === 'loggedIn') {
        navbarLinks.innerHTML = `
            <li class="nav-item mx-3"><a href="#" class="nav-link" data-page="game">Games</a></li>
            <li class="nav-item mx-3"><a href="#" class="nav-link" data-page="chat">Chat</a></li>
            <li class="nav-item mx-3"><a href="#" class="nav-link" data-page="leaderboard">Leaderboard</a></li>
            <li class="nav-item mx-3"><a href="#" class="nav-link" data-page="profile">Profile</a></li>
            <li class="nav-item mx-3"><a href="#" class="nav-link" id="logout-link">Logout</a></li>
        `;
        navbarLinks.classList.add('justify-content-between');
    } else {
        navbarLinks.innerHTML = `
            <li class="nav-item"><a href="#" class="nav-link" data-page="home">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link" data-page="login">Login</a></li>
            
        `;
    }
    setupPageLinks();
    setupLogoutLink();
}

// Setup event delegation for page links
function setupPageLinks() {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.removeEventListener('click', pageLinkHandler);
        link.addEventListener('click', pageLinkHandler);
    });
}

// Page link click handler
function pageLinkHandler(event) {
    event.preventDefault();
    const page = event.target.getAttribute('data-page');
    showPage(page);
}

// Setup logout link
function setupLogoutLink() {
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.removeEventListener('click', logout);
        logoutLink.addEventListener('click', logout);
    }
}

// Get the logged-in user's avatar
function getUserAvatar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser ? `images/${currentUser.avatar}` : 'images/avatar.png';
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    showPage('home');
}

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    const page = event.state ? event.state.page : 'home';
    showPage(page, false);
});

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);
});

// Expose functions globally
window.showPage = showPage;
window.logout = logout;