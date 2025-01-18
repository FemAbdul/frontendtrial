// Store users in local storage as an array of users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Show login page
function showLoginPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div id="login" class="page">
            <div class="row justify-content-center align-items-center" style="height:80vh;">
                <div class="col-md-4">
                    <h3 class="text-center">Login</h3>
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter your username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter your password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                        <div id="errorMessage" class="text-danger text-center mt-3"></div>
                    </form>
                    <div class="text-center mt-3">
                        <p>New user? <a href="#" onclick="showPage('register')">Register here</a></p>
                    </div>
                     <button id="loginWith42ID" class="login-42-button">Login with 42 ID</button>
                </div>
            </div>
        </div>`;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('loginWith42ID').addEventListener('click', handle42Login);
}

// Show registration page
function showRegisterPage() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div id="register" class="page">
            <div class="row justify-content-center align-items-center" style="height:80vh;">
                <div class="col-md-4">
                    <h3 class="text-center">Register</h3>
                    <form id="registerForm">
    <div class="mb-3">
        <label for="regUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="regUsername" placeholder="Choose a username" required>
    </div>
    <div class="mb-3">
        <label for="displayName" class="form-label">Display Name</label>
        <input type="text" class="form-control" id="displayName" placeholder="Choose a display name" required>
    </div>
    <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Enter your email" required>
    </div>
    <div class="mb-3">
        <label for="regPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="regPassword" placeholder="Choose a password" required>
    </div>
    <button type="submit" class="btn btn-primary w-100">Register</button>
    <div id="registerMessage" class="text-danger text-center mt-3"></div>
</form>
                    <div class="text-center mt-3">
                        <p>Already have an account? <a href="#" onclick="showPage('login')">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}


// Handle login form submission
function handleLogin(event) {
    event.preventDefault();  // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Make a POST request to the login endpoint
    fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid username or password.');
        }
        return response.json();
    })
    .then(data => {
        // Successful login
        localStorage.setItem('currentUser', JSON.stringify({
            username: data.username,
            displayName: data.display_name,
            avatar: data.avatar,
            token: data.access,
            refreshToken: data.refresh,  // Save the access token
        }));
        showDashboard();  // Show the dashboard page
    })
    .catch(error => {
        // Show error message if login failed
        document.getElementById('errorMessage').textContent = error.message;
        console.error('Error:', error);
    });
}



// Handle registration form submission
function handleRegister(event) {
    event.preventDefault();  // Prevent form submission

    const regUsername = document.getElementById('regUsername').value;
    const displayName = document.getElementById('displayName').value || regUsername;  // Use username if no display name is provided
    const email = document.getElementById('email').value;
    const regPassword = document.getElementById('regPassword').value;

    // Regex to check if the password is at least 8 characters long and contains at least one uppercase letter
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/;

    if (!passwordPattern.test(regPassword)) {
        document.getElementById('registerMessage').textContent = "Password must be at least 8 characters long and contain at least one uppercase letter.";
        return;
    }

    fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: regUsername,
            display_name: displayName,
            password: regPassword,
            email: email,
            // Avatar can be added if needed; assume backend provides a default if not provided
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "User registered successfully") {
            document.getElementById('registerMessage').textContent = "Registration successful! Please log in.";
        } else {
            document.getElementById('registerMessage').textContent = data.error || "Registration failed.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function showDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const content = document.getElementById('content');

    if (currentUser) {
        content.innerHTML = `
            <div id="dashboard" class="page">
                <h2 class="welcome-message">Welcome, <span class="display-name">${currentUser.displayName}</span>!</h2>
                <div class="dashboard-info">
                    <!-- Add other dashboard info here -->
                </div>
            </div>
        `;
        updateNavbar('loggedIn'); // Re-render the navbar
    } else {
        showLoginPage(); // Redirect to login if no user
    }
}


function handle42Login() {
    const clientID = 'YOUR_42_CLIENT_ID'; // Replace with your actual 42 client ID
    const redirectURI = 'YOUR_REDIRECT_URI'; // Replace with your actual redirect URI

    // Redirect to the 42 authorization endpoint
    window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code&scope=public`;
}