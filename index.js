const myLibrary = [];
const bookTableBody = document.querySelector("#book-table > tbody");

class Book {
  constructor(name, author, pageCount, hasRead) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.hasRead = hasRead ? "Have read" : "To read";
  }

  toggleReadStatus() {
    if (this.hasRead === "Have read") {
      this.hasRead = "To read";
    } else {
      this.hasRead = "Have read";
    }
  }
}

function addBookToLibrary(name, author, pageCount, hasRead) {
  const book = new Book(name, author, pageCount, hasRead);
  myLibrary.push(book);
}

function removeBook(e) {
  const bookRow = e.currentTarget.parentNode.parentNode;
  const bookRowIndex = Array.prototype.indexOf.call(
    bookTableBody.children,
    bookRow,
  );
  myLibrary.splice(bookRowIndex, 1);
  bookTableBody.removeChild(bookRow);
  if (myLibrary.length < 1) {
    displayEmptyPlaceholderRow();
  }
}

function createRemoveCell() {
  const rmvCell = document.createElement("td");
  const rmvBtn = document.createElement("button");
  const rmvIcon = document.createElement("span");
  rmvIcon.classList.add("material-symbols-outlined");
  rmvIcon.textContent = "delete";
  rmvBtn.appendChild(rmvIcon);
  rmvCell.appendChild(rmvBtn);
  rmvCell.classList.add("rmv-cell");

  rmvBtn.addEventListener("click", removeBook);

  return rmvCell;
}

function setToggleIndicator(toggleBtn, readState) {
  const toggleIcon = toggleBtn.children[0];
  if (readState === "Have read") {
    toggleIcon.textContent = "cancel";
    toggleBtn.className = "to-false";
  } else {
    toggleIcon.textContent = "check_circle";
    toggleBtn.className = "to-true";
  }
}

function toggleReadStatus(e) {
  const bookRow = e.currentTarget.parentNode.parentNode;
  const bookRowIndex = Array.prototype.indexOf.call(
    bookTableBody.children,
    bookRow,
  );
  const book = myLibrary[bookRowIndex];
  book.toggleReadStatus();
  setToggleIndicator(e.currentTarget, book.hasRead);
  bookRow.children[3].textContent = book.hasRead;
}

function createToggleReadCell(initReadState) {
  const toggleCell = document.createElement("td");
  const toggleBtn = document.createElement("button");
  const tglIcon = document.createElement("span");
  tglIcon.classList.add("material-symbols-outlined");
  tglIcon.textContent = "check_circle";
  toggleBtn.appendChild(tglIcon);
  setToggleIndicator(toggleBtn, initReadState);
  toggleCell.appendChild(toggleBtn);
  toggleCell.classList.add("tgl-cell");

  toggleBtn.addEventListener("click", toggleReadStatus);

  return toggleCell;
}

function displayEmptyPlaceholderRow() {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.textContent = "No book entries. Add using the button below.";
  cell.colSpan = 4;
  row.appendChild(cell);
  bookTableBody.appendChild(row);
}

function displayBookToTable(book) {
  const bookRow = document.createElement("tr");
  const bookProps = Object.keys(book);
  for (let i = 0; i < bookProps.length; i++) {
    const bookCell = document.createElement("td");
    bookCell.textContent = book[bookProps[i]];
    bookRow.appendChild(bookCell);
  }
  bookRow.appendChild(createToggleReadCell(book.hasRead));
  bookRow.appendChild(createRemoveCell());
  bookTableBody.appendChild(bookRow);
}

function displayLibraryToTable() {
  if (myLibrary.length < 1) {
    displayEmptyPlaceholderRow();
  } else {
    myLibrary.forEach(displayBookToTable);
  }
}

const addBookBtn = document.querySelector("#add-book");
const addBookDlg = document.querySelector("dialog");
addBookBtn.addEventListener("click", (e) => {
  addBookDlg.showModal();
});

const confirmBtn = addBookDlg.querySelector("#confirm-btn");
const titleInput = addBookDlg.querySelector("#title-i");
const authorInput = addBookDlg.querySelector("#author-i");
const pagesInput = addBookDlg.querySelector("#pages-i");
const readInput = addBookDlg.querySelector("#read-i");
const dialogForm = addBookDlg.querySelector("form");

function validateInputs() {
  const titleInvalid = titleInput.validity.valueMissing;
  const authorInvalid = authorInput.validity.valueMissing;
  const pagesInvalid = pagesInput.validity.valueMissing;

  if (titleInvalid) {
    titleInput.setCustomValidity("The title must be filled.");
  } else {
    titleInput.setCustomValidity("");
  }

  if (authorInvalid) {
    authorInput.setCustomValidity("The author name must be filled.");
  } else {
    authorInput.setCustomValidity("");
  }

  if (pagesInvalid) {
    pagesInput.setCustomValidity("The number of pages must be filled.");
  } else {
    pagesInput.setCustomValidity("");
  }

  return !titleInvalid && !authorInvalid && !pagesInvalid;
}

[titleInput, authorInput, pagesInput].forEach((input) => {
  input.addEventListener("input", function () {
    this.setCustomValidity("");
  });
});

confirmBtn.addEventListener("click", (e) => {
  if (!validateInputs()) return;

  const title = titleInput.value;
  const author = authorInput.value;
  const pageCount = pagesInput.value;
  const hasRead = readInput.checked;

  console.log(title, author, pageCount, hasRead);

  addBookToLibrary(title, author, pageCount, hasRead);
  displayBookToTable(myLibrary[myLibrary.length - 1]);
  dialogForm.reset();
  addBookDlg.close();
});

const cancelBtn = addBookDlg.querySelector("#cancel-btn");
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialogForm.reset();
  addBookDlg.close();
});

function test() {
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
  addBookToLibrary("Lord of the Flies", "William Golding", 224, true);
  displayLibraryToTable();
}

test();
