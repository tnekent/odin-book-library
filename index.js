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

function test() {
    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
    addBookToLibrary("Lord of the Flies", "William Golding", 224, true);
    console.table(myLibrary);
}