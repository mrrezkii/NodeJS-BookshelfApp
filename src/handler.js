const {nanoid} = require('nanoid');

const bookshelf = require('./bookshelf');

const addBookshelfHanlder = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;

  const id = nanoid(16);

  const finished = (pageCount === readPage) ? true: false;

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  const pageValid = (readPage > pageCount) ? false : true;

  if (!(pageValid)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  } else if (name === undefined || name === {}) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  bookshelf.push(newBook);
  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
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
  const {name, reading, finished} = request.query;
  const noData = undefined;

  let bookNameFiltering = bookshelf;

  if (name !== noData) {
    bookNameFiltering = bookNameFiltering.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: bookNameFiltering.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);

    return response;
  } else if (reading !== noData || reading !== {}) {
    bookNameFiltering = bookNameFiltering.filter((book) => (reading === 1) ? book.reading : !book.reading);
    const response = h.response({
      status: 'success',
      data: {
        books: bookNameFiltering.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);

    return response;
  } else if (finished !== noData || finished !== {}) {
    bookNameFiltering = bookNameFiltering.filter((book) => (finished === 1) ? book.finished : !book.finished);
    const response = h.response({
      status: 'success',
      data: {
        books: bookNameFiltering.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: bookNameFiltering.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);

  return response;
};

const getDetailBookshelfByIdHanlder = (request, h) => {
  const {bookId} = request.params;

  const detail = bookshelf.filter((book) => book.id === bookId)[0];


  if (detail !== undefined) {
    return {
      status: 'success',
      data: {
        book: detail,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);

  return response;
};

const updateDetailBookshelfByIdHanlder = (request, h) => {
  const {bookId} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading} = request.payload;
  const updatedAt = new Date().toISOString();

  const index = bookshelf.findIndex((book) => book.id === bookId);

  const noData = undefined;
  const pageValid = (readPage > pageCount) ? false : true;

  if (name === noData || name === {}) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);

    return response;
  } else if (!(pageValid)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);

    return response;
  } else if (index !== -1) {
    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteDetailBookshelfByIdHanlder = (request, h) => {
  const {bookId} = request.params;

  const index = bookshelf.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    bookshelf.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookshelfHanlder,
  getAllBookshelfHanlder,
  getDetailBookshelfByIdHanlder,
  updateDetailBookshelfByIdHanlder,
  deleteDetailBookshelfByIdHanlder};
