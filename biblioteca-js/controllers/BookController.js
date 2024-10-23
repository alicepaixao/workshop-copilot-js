const Book = require('../models/Book');

class BookController {
  static async addBook(req, res) {
    try {
      const { title, author } = req.body;
      const newBook = await Book.create({ title, author });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar livro' });
    }
  }

  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author } = req.body;
      const book = await Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

      book.title = title;
      book.author = author;
      await book.save();

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
  }

  static async getBooks(req, res) {
    try {
      const books = await Book.findAll();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livros' });
    }
  }

  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findByPk(id);
      if (!book) return res.status(404).json({ error: 'Livro não encontrado' });

      await book.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar livro' });
    }
  }
}

module.exports = BookController;
