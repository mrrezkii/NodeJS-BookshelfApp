const {nanoid} = require('nanoid');
const bookshelf = require('./bookshelf');

console.log(nanoid);
console.log(bookshelf);

const addBookshelfHanlder = (request, h) => {

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
