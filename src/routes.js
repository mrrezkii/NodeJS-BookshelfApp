const {
  addBookshelfHanlder,
  getAllBookshelfHanlder,
  getDetailBookshelfByIdHanlder,
  updateDetailBookshelfByIdHanlder,
  deleteDetailBookshelfByIdHanlder,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookshelfHanlder,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookshelfHanlder,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getDetailBookshelfByIdHanlder,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateDetailBookshelfByIdHanlder,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteDetailBookshelfByIdHanlder,
  },
];

module.exports = routes;
