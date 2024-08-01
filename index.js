const myLibrary = [];

function Book(name, author, pageCount, hasRead) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.hasRead = hasRead;
}

function addBookToLibrary(name, author, pageCount, hasRead) {
    const book = new Book(name, author, pageCount, hasRead);
    myLibrary.push(book);
}

function displayBookToTable(book, table) {
    const bookRow = document.createElement("tr");
    const bookProps = Object.keys(book);
    for (let i = 0; i < bookProps.length; i++) {
        const bookCell = document.createElement("td");
        bookCell.textContent = book[bookProps[i]];
        bookRow.appendChild(bookCell);
    }
    table.appendChild(bookRow);
}

function displayLibraryToTable() {
    const bookTableBody = document.querySelector("#book-table > tbody");
    myLibrary.forEach(book => displayBookToTable(book, bookTableBody));
}

function test() {
    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
    addBookToLibrary("Lord of the Flies", "William Golding", 224, true);
    displayLibraryToTable();
}

test();