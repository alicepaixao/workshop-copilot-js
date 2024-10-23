const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/dbConfig');
const Book = require('../models/Book');

beforeAll(async () => {
  await sequelize.sync();
});

afterEach(async () => {
  await Book.destroy({ where: {} });
});

test('Deve adicionar um livro', async () => {
  const response = await request(app).post('/books').send({
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
  });
  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe('O Senhor dos Anéis');
});

test('Deve atualizar um livro', async () => {
  const book = await Book.create({ title: 'Harry Potter', author: 'J.K. Rowling' });
  const response = await request(app).put(`/books/${book.id}`).send({
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
  });
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe('Harry Potter e a Pedra Filosofal');
});

test('Deve deletar um livro', async () => {
  const book = await Book.create({ title: '1984', author: 'George Orwell' });
  const response = await request(app).delete(`/books/${book.id}`);
  expect(response.statusCode).toBe(204);
});

test('Deve retornar todos os livros', async () => {
  await Book.create({ title: 'Fahrenheit 451', author: 'Ray Bradbury' });
  const response = await request(app).get('/books');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(1);
});
