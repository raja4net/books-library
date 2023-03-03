class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "Unknown",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
    console.log(this.books);
  }

  getBook(title) {
    return this.books.find((book) => book.title == title);
  }
}

const library = new Library();

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library.books) {
    createBookCard(book);
  }
};

const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  buttonGroup.classList.add("button-group");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `${book.title}`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.isRead) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-read");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-not-read");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(buttonGroup);
  const grid = document.querySelector(".books-grid");
  grid.appendChild(bookCard);
};

const resetBooksGrid = () => {
  const grid = document.querySelector(".books-grid");
  grid.innerHTML = "";
  bookCard.innerHTML = "";
};

const onSubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  const book = new Book(title, author, pages, isRead);

  library.books.push(book);
  console.log(library.books);
  createBookCard(book);
  closeModal();
};

const openModal = () => {
  const modal = document.querySelector(".modal");
  const form = document.querySelector(".add-book-form");
  form.reset();
  modal.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.remove("active");
  overlay.classList.remove("active");
};

const handleKeyboardInput = (e) => {
  if (e.key === "Escape") closeModal();
};

const toggleRead = (e) => {
  e.preventDefault();
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ""
  );
  console.log(title);
  if (e.target.classList.contains("btn-not-read")) {
    e.target.classList.remove("btn-not-read");
    e.target.classList.add("btn-read");
  } else {
    e.target.classList.remove("btn-read");
    e.target.classList.add("btn-not-read");
  }

  const book = library.getBook(title);
  book.isRead = !book.isRead;
  updateBooksGrid();
};

const removeBook = (event) => {
  event.preventDefault();
  const title =
    event.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', "");
  console.log(title);
  library.removeBook(title);
  updateBooksGrid();
};

const addBook = document.getElementById("addBook");
addBook.addEventListener("click", openModal);

const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", onSubmit);

const overlay = document.getElementById("overlay");
const bookCard = document.querySelector(".book-card");

updateBooksGrid();
window.onkeydown = handleKeyboardInput;
