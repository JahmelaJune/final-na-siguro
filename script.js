// Get all elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const loginPage = document.getElementById('loginPage');
const signupPage = document.getElementById('signupPage');
const forgotPasswordPage = document.getElementById('forgotPasswordPage');
const portfolioContent = document.getElementById('portfolioContent');
const logoutBtn = document.getElementById('logoutBtn');
const navbar = document.getElementById('navbar');
const footer = document.getElementById('footer');
const errorMessage = document.getElementById('errorMessage');
const signupErrorMessage = document.getElementById('signupErrorMessage');
const successMessage = document.getElementById('successMessage');
const forgotSuccessMessage = document.getElementById('forgotSuccessMessage');

// Correct credentials
const correctUsername = 'jahmelajune';
const correctPassword = '12345';

// Switch to signup page
document.getElementById('signupLink').addEventListener('click', (e) => {
    e.preventDefault();
    loginPage.classList.add('hidden');
    signupPage.classList.remove('hidden');
    errorMessage.textContent = '';
});

// Switch to forgot password page
document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
    e.preventDefault();
    loginPage.classList.add('hidden');
    forgotPasswordPage.classList.remove('hidden');
    errorMessage.textContent = '';
});

// Back to login from signup
document.getElementById('backToLoginFromSignup').addEventListener('click', (e) => {
    e.preventDefault();
    signupPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    signupErrorMessage.textContent = '';
});

// Back to login from forgot password
document.getElementById('backToLoginFromForgot').addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    forgotSuccessMessage.textContent = '';
});

// Login functionality
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === correctUsername && password === correctPassword) {
        // Successful login
        loginPage.classList.add('hidden');
        portfolioContent.classList.add('active');
        navbar.classList.remove('hidden');
        footer.classList.add('active');
        errorMessage.textContent = '';
        
        // Set active nav link for home section
        document.querySelector('.nav-link[data-section="home"]').classList.add('active');
    } else {
        // Failed login
        errorMessage.textContent = 'Invalid username or password. Please try again.';
        document.getElementById('password').value = '';
    }
});

// Signup functionality
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        signupErrorMessage.textContent = 'Passwords do not match!';
        return;
    }

    // Clear error and show success
    signupErrorMessage.textContent = '';
    successMessage.textContent = 'Account created successfully! Please login.';
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
        signupPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
        successMessage.textContent = '';
        signupForm.reset();
    }, 2000);
});

// Forgot password functionality
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    forgotSuccessMessage.textContent = 'Reset link sent to your email!';
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
        forgotPasswordPage.classList.add('hidden');
        loginPage.classList.remove('hidden');
        forgotSuccessMessage.textContent = '';
        forgotPasswordForm.reset();
    }, 2000);
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    portfolioContent.classList.remove('active');
    loginPage.classList.remove('hidden');
    navbar.classList.add('hidden');
    footer.classList.remove('active');
    loginForm.reset();
    errorMessage.textContent = '';
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
});

// Navigation link highlighting and smooth scrolling
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Smooth scroll to section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Highlight navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
});