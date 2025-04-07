// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Chatbot state
let chatState = 'greeting';
let userPreferences = {
    genres: [],
    authors: [],
    mood: '',
    recentReads: []
};

// Sample book recommendations by genre
const genreRecommendations = {
    mystery: ['The Silent Patient', 'Gone Girl', 'The Girl with the Dragon Tattoo'],
    romance: ['The Song of Achilles', 'Normal People', 'Pride and Prejudice'],
    'science fiction': ['Project Hail Mary', 'Dune', 'The Three-Body Problem'],
    fantasy: ['The Name of the Wind', 'The Lies of Locke Lamora', 'The Way of Kings'],
    biography: ['Educated', 'Becoming', 'Born a Crime'],
    'self-help': ['Atomic Habits', 'The Subtle Art of Not Giving a F*ck', 'Deep Work']
};

// Mood to genre mapping
const moodToGenre = {
    adventurous: ['adventure', 'science fiction', 'fantasy'],
    romantic: ['romance', 'contemporary'],
    mysterious: ['mystery', 'thriller'],
    thoughtprovoking: ['biography', 'non-fiction', 'philosophy'],
    funny: ['humor', 'comedy']
};

// Initialize the chat
function initChat() {
    addBotMessage("Hello! I'm BookGenie, your personal book recommendation assistant. 📚");
    addBotMessage("I can help you discover your next favorite book. Tell me about:");
    addBotMessage("- Your favorite genres or authors");
    addBotMessage("- Books you've enjoyed recently");
    addBotMessage("- What kind of mood you're in for reading");
    addBotMessage("For example, you could say: 'I like mystery novels' or 'Recommend something adventurous'");
}

// Add a message from the bot to the chat
function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add a message from the user to the chat
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
        <div class="avatar">
            <i class="fas fa-user"></i>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process user input
function processUserInput() {
    const text = userInput.value.trim();
    if (!text) return;
    
    addUserMessage(text);
    userInput.value = '';
    
    // Check if user is asking about a specific book
    if (isBookInquiry(text)) {
        handleBookInquiry(text);
        return;
    }
    
    // Process based on current chat state
    switch(chatState) {
        case 'greeting':
            handleGreetingResponse(text);
            break;
        case 'genreSelection':
            handleGenreSelection(text);
            break;
        case 'authorSelection':
            handleAuthorSelection(text);
            break;
        case 'moodSelection':
            handleMoodSelection(text);
            break;
        case 'recommendation':
            handleRecommendationResponse(text);
            break;
        default:
            handleDefaultResponse(text);
    }
}

// Handle initial greeting response
function handleGreetingResponse(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('genre') || lowerText.includes('type') || lowerText.includes('kind')) {
        askAboutGenres();
    } 
    else if (lowerText.includes('mood') || lowerText.includes('feel') || lowerText.includes('want')) {
        askAboutMood();
    }
    else if (lowerText.includes('author') || lowerText.includes('writer')) {
        askAboutAuthors();
    }
    else if (lowerText.includes('recent') || lowerText.includes('read') || lowerText.includes('enjoyed')) {
        askAboutRecentReads();
    }
    else {
        // Try to extract genres or mood from free text
        const extractedGenres = extractGenres(text);
        if (extractedGenres.length > 0) {
            userPreferences.genres = extractedGenres;
            addBotMessage(`I see you mentioned ${extractedGenres.join(' and ')}. Great choices!`);
            askAboutMood();
        } else {
            const extractedMood = extractMood(text);
            if (extractedMood) {
                userPreferences.mood = extractedMood;
                addBotMessage(`I'll look for books that match your ${extractedMood} mood.`);
                provideRecommendations();
            } else {
                addBotMessage("I'd love to help you find your next great read! Could you tell me what genres you typically enjoy? For example, do you like mystery, romance, or science fiction?");
                chatState = 'genreSelection';
            }
        }
    }
}

// Ask about preferred genres
function askAboutGenres() {
    addBotMessage("What genres do you enjoy? You can say things like:");
    addBotMessage("- Mystery and thriller");
    addBotMessage("- Science fiction or fantasy");
    addBotMessage("- Non-fiction and biographies");
    addBotMessage("- Any combination of genres you like");
    chatState = 'genreSelection';
}

// Extract genres from user text
function extractGenres(text) {
    const genreMap = {
        'mystery': ['mystery', 'thriller', 'crime'],
        'romance': ['romance', 'love', 'relationship'],
        'scifi': ['science fiction', 'sci-fi', 'sf', 'space'],
        'fantasy': ['fantasy', 'magic', 'sword'],
        'biography': ['biography', 'memoir', 'autobiography'],
        'selfhelp': ['self-help', 'self improvement', 'motivation']
    };
    
    const foundGenres = [];
    const lowerText = text.toLowerCase();
    
    for (const [genre, keywords] of Object.entries(genreMap)) {
        if (keywords.some(keyword => lowerText.includes(keyword))) {
            foundGenres.push(genre);
        }
    }
    
    return foundGenres;
}

// Handle genre selection
function handleGenreSelection(text) {
    const extractedGenres = extractGenres(text);
    
    if (extractedGenres.length > 0) {
        userPreferences.genres = extractedGenres;
        addBotMessage(`Got it! You enjoy ${extractedGenres.join(', ')} books.`);
        
        // Ask about mood unless user already mentioned it
        if (!userPreferences.mood) {
            askAboutMood();
        } else {
            provideRecommendations();
        }
    } else {
        addBotMessage("I'm not sure I recognize those genres. Popular genres include mystery, romance, science fiction, fantasy, biography, and self-help. Could you try again?");
    }
}

// Ask about favorite authors
function askAboutAuthors() {
    addBotMessage("Which authors do you enjoy reading? You can list multiple names like:");
    addBotMessage("- Stephen King and Agatha Christie");
    addBotMessage("- J.K. Rowling");
    addBotMessage("- Any authors whose work you admire");
    chatState = 'authorSelection';
}

// Handle author selection
function handleAuthorSelection(text) {
    // In a real app, you'd validate these against your database
    const authors = text.split(/[,.]|\band\b/).map(a => a.trim()).filter(a => a);
    
    if (authors.length > 0) {
        userPreferences.authors = authors;
        addBotMessage(`Thanks! I'll keep ${authors.length > 1 ? 'these authors' : 'this author'} in mind: ${authors.join(', ')}`);
        
        if (userPreferences.genres.length === 0) {
            askAboutGenres();
        } else if (!userPreferences.mood) {
            askAboutMood();
        } else {
            provideRecommendations();
        }
    } else {
        addBotMessage("I didn't catch any author names. Could you try again? For example: 'I like Stephen King' or 'My favorite authors are J.K. Rowling and George R.R. Martin'");
    }
}

// Ask about recent reads
function askAboutRecentReads() {
    addBotMessage("What books have you read recently that you enjoyed? This helps me understand your taste better.");
    chatState = 'recentReads';
}

// Ask about current mood
function askAboutMood() {
    addBotMessage("What kind of mood are you in for reading? For example:");
    addBotMessage("- Adventurous: For exciting, action-packed stories");
    addBotMessage("- Romantic: For love stories and emotional journeys");
    addBotMessage("- Thought-provoking: For deep, meaningful books");
    addBotMessage("- Funny: For lighthearted, humorous reads");
    addBotMessage("- Mysterious: For puzzles and thrillers");
    chatState = 'moodSelection';
}

// Extract mood from text
function extractMood(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('adventur') || lowerText.includes('action') || lowerText.includes('excit')) {
        return 'adventurous';
    } 
    else if (lowerText.includes('romantic') || lowerText.includes('love') || lowerText.includes('heart')) {
        return 'romantic';
    }
    else if (lowerText.includes('thought') || lowerText.includes('deep') || lowerText.includes('meaning')) {
        return 'thought-provoking';
    }
    else if (lowerText.includes('fun') || lowerText.includes('light') || lowerText.includes('happy') || lowerText.includes('humor')) {
        return 'funny';
    }
    else if (lowerText.includes('mystery') || lowerText.includes('puzzle') || lowerText.includes('solve') || lowerText.includes('thriller')) {
        return 'mysterious';
    }
    
    return null;
}

// Handle mood selection
function handleMoodSelection(text) {
    const mood = extractMood(text);
    
    if (mood) {
        userPreferences.mood = mood;
        addBotMessage(`I'll look for books that match your ${mood} mood.`);
        provideRecommendations();
    } else {
        addBotMessage("I'm not sure what mood you're describing. Could you try again? For example: 'I want something adventurous' or 'I'm in the mood for a romantic story'");
    }
}

// Provide book recommendations based on preferences
function provideRecommendations() {
    // In a real app, this would be an API call to your backend
    let recommendedBooks = [];
    
    // First try to match genres
    if (userPreferences.genres.length > 0) {
        userPreferences.genres.forEach(genre => {
            if (genreRecommendations[genre]) {
                recommendedBooks = [...recommendedBooks, ...genreRecommendations[genre]];
            }
        });
    }
    
    // Then try to match mood if we don't have enough recommendations
    if (recommendedBooks.length < 3 && userPreferences.mood) {
        const moodGenres = moodToGenre[userPreferences.mood] || [];
        moodGenres.forEach(genre => {
            if (genreRecommendations[genre] && !userPreferences.genres.includes(genre)) {
                recommendedBooks = [...recommendedBooks, ...genreRecommendations[genre]];
            }
        });
    }
    
    // If still not enough, add some general recommendations
    if (recommendedBooks.length < 3) {
        recommendedBooks = [
            ...recommendedBooks,
            'The Silent Patient',
            'Where the Crawdads Sing',
            'Project Hail Mary',
            'The Midnight Library'
        ];
    }
    
    // Remove duplicates and limit to 3
    recommendedBooks = [...new Set(recommendedBooks)].slice(0, 3);
    
    addBotMessage("Based on your preferences, here are some books you might enjoy:");
    
    recommendedBooks.forEach((book, index) => {
        addBotMessage(`${index + 1}. <strong>${book}</strong>`);
    });
    
    addBotMessage("Would you like to:");
    addBotMessage("- Get more recommendations");
    addBotMessage("- Change your preferences");
    addBotMessage("- Hear more about one of these books");
    addBotMessage("- Or something else?");
    
    chatState = 'recommendation';
}

// Handle user response to recommendations
function handleRecommendationResponse(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('more') || lowerText.includes('another') || lowerText.includes('yes')) {
        provideAdditionalRecommendations();
    }
    else if (lowerText.includes('change') || lowerText.includes('different') || lowerText.includes('refine')) {
        addBotMessage("What would you like to change? Your genres, authors, mood, or something else?");
        chatState = 'greeting';
    }
    else if (isBookInquiry(text)) {
        handleBookInquiry(text);
    }
    else if (lowerText.includes('no') || lowerText.includes('thanks') || lowerText.includes('thank you')) {
        addBotMessage("You're welcome! Come back anytime you need more recommendations. Happy reading! 📖");
        chatState = 'greeting';
    }
    else {
        addBotMessage("I'm not sure what you'd like to do next. You can:");
        addBotMessage("- Ask for more recommendations");
        addBotMessage("- Change your preferences");
        addBotMessage("- Ask about a specific book");
    }
}

// Check if user is asking about a specific book
function isBookInquiry(text) {
    const lowerText = text.toLowerCase();
    return recommendedBooks.some(book => 
        lowerText.includes(book.toLowerCase()) || 
        book.toLowerCase().includes(lowerText)
    );
}

// Handle book inquiry
function handleBookInquiry(text) {
    const bookTitle = recommendedBooks.find(book => 
        text.toLowerCase().includes(book.toLowerCase()) || 
        book.toLowerCase().includes(text.toLowerCase())
    );
    
    if (bookTitle) {
        const book = findBookDetails(bookTitle);
        if (book) {
            addBotMessage(`<strong>${book.title}</strong> by ${book.author}`);
            addBotMessage(`Genre: ${book.genres.join(', ')}`);
            addBotMessage(`Rating: ${getStarRating(book.rating)} (${book.rating.toFixed(1)}/5)`);
            addBotMessage(`Description: ${book.description.substring(0, 150)}...`);
            addBotMessage("Would you like to add this to your reading list?");
        } else {
            addBotMessage(`I don't have detailed information about ${bookTitle} right now.`);
        }
    } else {
        addBotMessage("I'm not sure which book you're asking about. Could you clarify?");
    }
}

// Provide additional recommendations
function provideAdditionalRecommendations() {
    // In a real app, this would be an API call with different parameters
    let additionalBooks = [];
    
    // Try different genres than previously recommended
    const allGenres = Object.keys(genreRecommendations);
    const unusedGenres = allGenres.filter(genre => 
        !userPreferences.genres.includes(genre) && 
        !(userPreferences.mood && moodToGenre[userPreferences.mood]?.includes(genre))
    );
    
    if (unusedGenres.length > 0) {
        const randomGenre = unusedGenres[Math.floor(Math.random() * unusedGenres.length)];
        additionalBooks = genreRecommendations[randomGenre].slice(0, 2);
        addBotMessage(`How about trying some ${randomGenre}? You might enjoy:`);
    } else {
        // Fallback to popular books
        additionalBooks = [
            'The Seven Husbands of Evelyn Hugo',
            'Pachinko',
            'The Vanishing Half'
        ];
        addBotMessage("Here are some more popular books you might enjoy:");
    }
    
    additionalBooks.forEach((book, index) => {
        addBotMessage(`${index + 1}. <strong>${book}</strong>`);
    });
    
    addBotMessage("Would you like to know more about any of these, or get different recommendations?");
}

// Handle default responses
function handleDefaultResponse(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        addBotMessage("Hello again! How can I help you with book recommendations today?");
        chatState = 'greeting';
    }
    else if (lowerText.includes('bye') || lowerText.includes('goodbye') || lowerText.includes('exit')) {
        addBotMessage("Goodbye! Come back anytime you need book recommendations. Happy reading! 📚");
    }
    else if (lowerText.includes('help') || lowerText.includes('what can you do')) {
        addBotMessage("I can help you discover books you'll love! Here's what I can do:");
        addBotMessage("- Recommend books based on your favorite genres");
        addBotMessage("- Suggest authors you might enjoy");
        addBotMessage("- Find books that match your current mood");
        addBotMessage("- Tell you more about specific books");
        addBotMessage("Just tell me what you're looking for!");
    }
    else {
        addBotMessage("I'm not sure I understand. Could you rephrase that? Or tell me about books you like to read.");
    }
}

// Find book details in sample data
function findBookDetails(bookTitle) {
    return sampleBooks.find(book => 
        book.title.toLowerCase().includes(bookTitle.toLowerCase()) ||
        bookTitle.toLowerCase().includes(book.title.toLowerCase())
    );
}

// Generate star rating HTML
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

// Track recommended books
let recommendedBooks = [];

// Event listeners
sendBtn.addEventListener('click', processUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        processUserInput();
    }
});

// Initialize the chat when the page loads
document.addEventListener('DOMContentLoaded', initChat);