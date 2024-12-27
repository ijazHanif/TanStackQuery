const express = require("express");
const Book = require("../models/books");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post('/books', auth, async (req, res) => {
  const { title, description, author, publishdate } = req.body;

  // Check for required fields
  if (!title || !description || !author || !publishdate) {
    return res.status(400).json({
      error: "All fields (title, description, author, publishdate) are required.",
    });
  }

  // Debugging logs
  console.log('User ID:', req.user.id);
  console.log('Request Body:', req.body);

  const book = new Book({
    ...req.body,
    owner: req.user.id, // Ensure the owner field is set to the authenticated user ID
  });

  try {
    await book.save();
    res.status(201).json(book);
  } catch (e) {
    console.error('Book Creation Error:', e); // Log the error
    if (e.name === 'ValidationError') {
      return res.status(400).json({ error: e.message });
    }
    res.status(500).json({ error: "An error occurred while creating the book." });
  }
});

// Getting all books, regardless of owner
router.get("/books", auth, async (req, res) => {
  try {
    const books = await Book.find(); // No filter on owner

    if (books.length === 0) {
      return res.status(404).json({ error: "No books found." });
    }

    res.status(200).json(books);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while retrieving books." });
  }
});

// Getting a book by its ID
router.get("/books/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const book = await Book.findOne({ _id }); // Remove owner filter to allow any user to view

    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    res.status(200).json(book);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while retrieving the book." });
  }
});

// Deleting a book by its ID
const mongoose = require("mongoose");

router.delete("/books/:id", auth, async (req, res) => {
  const _id = req.params.id;

  // Validate if _id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  try {
    console.log("Requesting to delete book with ID:", _id);
    console.log("Authenticated User ID:", req.user._id);

    // Check if the book exists before filtering by owner
    const book = await Book.findOne({ _id });
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    console.log("Book Found:", book);
    console.log("Book Owner ID:", book.owner);

    // Check if the authenticated user is the owner of the book
    if (book.owner && book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized: You do not own this book." });
    }

    // Delete the book
    await book.deleteOne();
    res.status(200).json({ message: "Book deleted successfully.", book });
  } catch (e) {
    console.error("Delete Book Error:", e);
    res.status(500).json({ error: "An error occurred while deleting the book." });
  }
});

// Updating a book by its ID
router.patch("/books/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "author", "publishdate"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid book ID format." });
  }

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates." });
  }

  try {
    console.log("Requesting to update book with ID:", _id);
    console.log("Authenticated User ID:", req.user._id);

    // Find the book first, regardless of ownership, to provide detailed error info
    const book = await Book.findOne({ _id });
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }

    console.log("Book Found:", book);
    console.log("Book Owner ID:", book.owner);

    // Check ownership
    if (book.owner && book.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized: You do not own this book." });
    }

    // Perform the updates
    updates.forEach((update) => (book[update] = req.body[update]));
    await book.save();
    res.status(200).json(book);
  } catch (e) {
    console.error("Update Book Error:", e);
    res.status(500).json({ error: "An error occurred while updating the book." });
  }
});

module.exports = router;