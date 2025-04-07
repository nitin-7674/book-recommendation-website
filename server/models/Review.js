const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Update book's average rating when a review is saved
reviewSchema.post('save', async function() {
    const Book = mongoose.model('Book');
    const book = await Book.findById(this.book);
    
    const reviews = await mongoose.model('Review').find({ book: this.book });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    book.averageRating = totalRating / reviews.length;
    
    await book.save();
});

module.exports = mongoose.model('Review', reviewSchema);