const { Router } = require("express");
const { getAllBooks, getBookById, addBook, updateBookById, deleteBookById, filterBooks } = require('../controller/bookController');
const { validateBookData } = require("../middleware/bookMiddleware");
const bookRouter = Router();

// Routes
bookRouter.get('/', getAllBooks);
bookRouter.get('/book/:id', getBookById);
bookRouter.post('/addbooks', validateBookData,addBook);
bookRouter.patch('/update/:id', updateBookById);
bookRouter.delete('/delete/:id', deleteBookById);
bookRouter.get('/filter', filterBooks);

module.exports = bookRouter;
