let addBookBtn = document.getElementById('addBook');
let formEl = document.getElementById('addBookForm');
let titleInputEl = document.getElementById('titleInput');
let authorInputEl = document.getElementById('authorInput');
let pagesInputEl = document.getElementById('pagesInput');
let readBookEl = document.getElementById('readBook');
let booksContainerEl = document.getElementById('booksContainer');

let myLibrary=getLibraryArray();
let title,author,pages,readStatus;
let bookCount=myLibrary.length;

titleInputEl.addEventListener('change',event => {
  title = event.target.value;
});

authorInputEl.addEventListener('change',event => {
  author = event.target.value;
});

pagesInputEl.addEventListener('change',event => {
  pages = event.target.value;
});

readBookEl.addEventListener('change',event => {
  readStatus = event.target.checked;
});

function getLibraryArray() {
    let tdl = localStorage.getItem('myLibraryArray');
    let parsedLibraryList = JSON.parse(tdl);
    return (parsedLibraryList === null)? []: parsedLibraryList;
}

function shadowClass(id){
  switch (id%4) {
    case 1:
      return "shadow-bottom";
    case 2:
      return "shadow-left";
    case 3:
      return "shadow-top";
    default:
      return "shadow-right";
  }
}

function deleteBook(bookId){
  let book = document.getElementById(`book${bookId}`);
  let bookIndex = myLibrary.findIndex(item => item.id === bookId);
  myLibrary.splice(bookIndex,1);
  booksContainerEl.removeChild(book);
  localStorage.setItem('myLibraryArray',JSON.stringify(myLibrary));
}

function createAndAppendBook(bookObj){
  const {id, title, author, noOfPages, hasRead} = bookObj;
  let bookId = `book${id}`;

  let bookCard = document.createElement('div');
  bookCard.classList.add('books-card', shadowClass(id));
  bookCard.id = bookId;
  booksContainerEl.appendChild(bookCard);

  let titleEl = document.createElement('h1');
  titleEl.classList.add('card-title');
  titleEl.textContent = title;
  bookCard.appendChild(titleEl);

  let authorEl = document.createElement('p');
  authorEl.classList.add('card-author');
  authorEl.textContent = author;
  bookCard.appendChild(authorEl);

  let pagesEl = document.createElement('p');
  pagesEl.classList.add('card-pages');
  pagesEl.textContent = "Pages : ";
  bookCard.appendChild(pagesEl);

  let noOfPagesEl = document.createElement('span');
  noOfPagesEl.classList.add('pages-number');
  noOfPagesEl.textContent = noOfPages;
  pagesEl.appendChild(noOfPagesEl);

  let readBookEl = document.createElement('p');
  readBookEl.textContent = "Read the Book : ";
  bookCard.appendChild(readBookEl);
//
  let TrueStatusEl = document.createElement('button');
  TrueStatusEl.classList.add('read-book','true','d-none');
  TrueStatusEl.textContent = 'Y' ;
  TrueStatusEl.onclick = function() {
    TrueStatusEl.classList.toggle('d-none');
    falseStatusEl.classList.toggle('d-none');
  };
  readBookEl.appendChild(TrueStatusEl);
  
  let falseStatusEl = document.createElement('button');
  falseStatusEl.classList.add('read-book','false','d-none');
  falseStatusEl.textContent = 'N';
  falseStatusEl.onclick = function() {
    TrueStatusEl.classList.toggle('d-none');
    falseStatusEl.classList.toggle('d-none');
  };
  readBookEl.appendChild(falseStatusEl);
  
  hasRead? TrueStatusEl.classList.toggle('d-none'): falseStatusEl.classList.toggle('d-none');
//
  let deleteEl = document.createElement('button');
  deleteEl.classList.add('delete-book');
  bookCard.appendChild(deleteEl);

  deleteEl.addEventListener('click',() => {
    deleteBook(id);    
  });

  let icon = document.createElement('i');
  icon.classList.add('fas','fa-times');
  deleteEl.appendChild(icon);
}

//constructor function
function Book(title,author,pages,read = false) {
  this.id = bookCount + 1;  
  this.title = title;
  this.author = author;
  this.noOfPages = pages;
  this.hasRead = read;
  bookCount += 1;
}

for (let book of myLibrary){
  createAndAppendBook(book);
}

formEl.addEventListener('submit',event => {
  event.preventDefault();
  let newBook = new Book(title,author,pages,readStatus);
  myLibrary.push(newBook);
  localStorage.setItem('myLibraryArray',JSON.stringify(myLibrary));
  createAndAppendBook(newBook);

  titleInputEl.value = "";
  authorInputEl.value = "";
  pagesInputEl.value = "";
  readBookEl.checked = false;
});
