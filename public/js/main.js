// DOM Elements
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const userProfile = document.querySelector('.user-profile');
const authButtons = document.querySelector('.auth-buttons');
const usernameDisplay = document.getElementById('username-display');
const startChatBtn = document.getElementById('start-chat-btn');
const closeChatBtn = document.getElementById('close-chat-btn');
const chatbotSection = document.getElementById('chatbot-section');
const moodCards = document.querySelectorAll('.mood-card');
const bookSearch = document.getElementById('book-search');
const genreFilter = document.getElementById('genre-filter');
const searchBtn = document.getElementById('search-btn');
const bookGrid = document.getElementById('book-grid');
const trendingBooks = document.getElementById('trending-books');
const bookModal = document.getElementById('book-modal');
const bookDetailContent = document.getElementById('book-detail-content');

// Sample user data (in a real app, this would come from your backend)
let currentUser = null;

// Event Listeners
loginBtn.addEventListener('click', () => toggleModal(loginModal));
signupBtn.addEventListener('click', () => toggleModal(signupModal));

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        signupModal.classList.add('hidden');
        bookModal.classList.add('hidden');
    });
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    signupModal.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
});

startChatBtn.addEventListener('click', () => {
    chatbotSection.classList.remove('hidden');
});

closeChatBtn.addEventListener('click', () => {
    chatbotSection.classList.add('hidden');
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // In a real app, you would send this to your backend for authentication
    console.log('Login attempt with:', email, password);
    
    // Simulate successful login
    currentUser = {
        name: 'John Doe',
        email: email
    };
    
    // Update UI
    usernameDisplay.textContent = currentUser.name;
    authButtons.classList.add('hidden');
    userProfile.classList.remove('hidden');
    loginModal.classList.add('hidden');
    
    // Show welcome message
    alert(`Welcome back, ${currentUser.name}!`);
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Signup attempt with:', name, email, password);
    
    // Simulate successful signup
    currentUser = {
        name: name,
        email: email
    };
    
    // Update UI
    usernameDisplay.textContent = currentUser.name;
    authButtons.classList.add('hidden');
    userProfile.classList.remove('hidden');
    signupModal.classList.add('hidden');
    
    // Show welcome message
    alert(`Welcome to BookGenie, ${currentUser.name}!`);
});

// Mood card click handler
moodCards.forEach(card => {
    card.addEventListener('click', () => {
        const mood = card.getAttribute('data-mood');
        // In a real app, you would fetch books based on mood
        console.log('Selected mood:', mood);
        alert(`Showing books for mood: ${mood}`);
    });
});

// Search and filter handler
searchBtn.addEventListener('click', () => {
    const searchTerm = bookSearch.value;
    const genre = genreFilter.value;
    // In a real app, you would fetch books based on search and filter
    console.log('Searching for:', searchTerm, 'Genre:', genre);
    filterBooks(searchTerm, genre);
});

// Book grid click handler (event delegation)
bookGrid.addEventListener('click', (e) => {
    const bookCard = e.target.closest('.book-card');
    if (bookCard) {
        const bookId = bookCard.getAttribute('data-id');
        showBookDetails(bookId);
    }
});

// Trending books click handler (event delegation)
trendingBooks.addEventListener('click', (e) => {
    const bookCard = e.target.closest('.trending-book');
    if (bookCard) {
        const bookId = bookCard.getAttribute('data-id');
        showBookDetails(bookId);
    }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.classList.add('hidden');
    if (e.target === signupModal) signupModal.classList.add('hidden');
    if (e.target === bookModal) bookModal.classList.add('hidden');
});

// Functions
function toggleModal(modal) {
    modal.classList.toggle('hidden');
}

function filterBooks(searchTerm, genre) {
    // In a real app, this would be an API call to your backend
    const filtered = sampleBooks.filter(book => {
        const matchesSearch = !searchTerm || 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGenre = !genre || book.genres.includes(genre);
        return matchesSearch && matchesGenre;
    });
    
    displayBooks(filtered);
}

function displayBooks(books) {
    bookGrid.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.setAttribute('data-id', book.id);
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="book-rating">
                    ${getStarRating(book.rating)}
                </div>
                <div class="book-actions">
                    <button class="view-details">Details</button>
                    <button class="save-book">Save</button>
                </div>
            </div>
        `;
        bookGrid.appendChild(bookCard);
    });
}

function displayTrendingBooks(books) {
    trendingBooks.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'trending-book';
        bookCard.setAttribute('data-id', book.id);
        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <div class="trending-book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <div class="book-rating">
                    ${getStarRating(book.rating)}
                </div>
            </div>
        `;
        trendingBooks.appendChild(bookCard);
    });
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return `
        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
    `;
}

async function showBookDetails(bookId) {
    // In a real app, you would fetch book details from your backend
    const book = sampleBooks.find(b => b.id === bookId);
    
    if (!book) return;
    
    bookDetailContent.innerHTML = `
        <div class="book-modal-header">
            <div class="book-modal-cover">
                <img src="${book.cover}" alt="${book.title}">
            </div>
            <div class="book-modal-info">
                <h2>${book.title}</h2>
                <p class="book-modal-author">by ${book.author}</p>
                <div class="book-modal-rating">
                    <div class="stars">
                        ${getStarRating(book.rating)}
                    </div>
                    <span>${book.rating.toFixed(1)} (${book.reviews.length} reviews)</span>
                </div>
                <div class="book-modal-meta">
                    <span>${book.pages} pages</span>
                    <span>${book.genres.join(', ')}</span>
                    <span>Published ${book.published}</span>
                </div>
                <p class="book-modal-description">${book.description}</p>
                <div class="book-modal-actions">
                    <button class="add-to-list">Add to My List</button>
                    <button class="write-review">Write Review</button>
                </div>
            </div>
        </div>
        <div class="book-modal-reviews">
            <h3>Reviews</h3>
            ${book.reviews.map(review => `
                <div class="review">
                    <div class="review-header">
                        <span class="review-user">${review.user}</span>
                        <span class="review-rating">${getStarRating(review.rating)}</span>
                    </div>
                    <div class="review-date">${review.date}</div>
                    <div class="review-content">${review.content}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    bookModal.classList.remove('hidden');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load sample books
    displayBooks(sampleBooks);
    
    // Display trending books (top rated in this sample)
    const trending = [...sampleBooks].sort((a, b) => b.rating - a.rating).slice(0, 5);
    displayTrendingBooks(trending);
});