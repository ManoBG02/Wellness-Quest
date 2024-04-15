const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function redirectToDashboard() {
    window.location.href = 'dashboard.html';
}

// Event listener for login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting via the browser
    redirectToDashboard();
});

// Event listener for signup form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting via the browser
    redirectToDashboard();
});

// Assuming you have a button for direct navigation to the signup page
document.querySelector('.sign-up').addEventListener('click', function () {
    window.location.href = 'signup.html';
});