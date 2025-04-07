// server/controllers/chatController.js
exports.getRecommendations = async (req, res) => {
    try {
      const { genres, mood } = req.body;
      
      // Your recommendation logic here
      const books = await Book.find({ genres: { $in: genres } }).limit(5);
      
      res.status(200).json({
        status: 'success',
        data: { books }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message
      });
    }
  };