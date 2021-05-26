let addBookBtn = document.getElementById('addBook');

function addBook() {
  console.log(addBookBtn);
}

function Book(title,author,pages,read = false) {
  this.title = title;
  this.author = author;
  this.noOfPages = pages;
  this.hasRead = read;
}