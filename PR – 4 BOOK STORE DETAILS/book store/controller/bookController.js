const Book = require("../model/bookModel");

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(200).json(savedBook);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update book by ID
const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Delete book by ID
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json();
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
};

// Filter and search books
const filterBooks = async (req, res) => {
  try {
    const filter = {};

    if (req.query.author) filter.author = req.query.author;
    if (req.query.category) filter.category = req.query.category;

    const sortOptions = {};
    if (req.query.price === "lth") {
      sortOptions.price = 1;
    } else if (req.query.price === "htl") {
      sortOptions.price = -1; // Sort by price in descending order
    }

    const books = await Book.find(filter).sort(sortOptions);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBookById,
  deleteBookById,
  filterBooks,
};
