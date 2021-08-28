/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const bookshelf = require('./bookshelf');

const addBookshelfHanlder = (request, h) => {
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  const id = nanoid(16);

  const finished = (pageCount === readPage) ? true: false;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, createdAt, updatedAt,
  };


  const noData = undefined;
  const pageValid = (readPage > pageCount) ? false : true;
  bookshelf.push(newBook);
  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (name === noData || name === {}) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);

    return response;
  } else if (!(pageValid)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);

    return response;
  } else if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);

  return response;
};

const getAllBookshelfHanlder = (request, h) => {

};

const getDetailBookshelfByIdHanlder = (request, h) => {

};

const updateDetailBookshelfByIdHanlder = (request, h) => {

};

const deleteDetailBookshelfByIdHanlder = (request, h) => {

};

module.exports = {
  addBookshelfHanlder,
  getAllBookshelfHanlder,
  getDetailBookshelfByIdHanlder,
  updateDetailBookshelfByIdHanlder,
  deleteDetailBookshelfByIdHanlder};
