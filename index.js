const myLibrary = [];
const bookTableBody = document.querySelector("#book-table > tbody");

function Book(name, author, pageCount, hasRead) {
    this.name = name;
    this.author = author;
    this.pageCount = pageCount;
    this.hasRead = hasRead ? "Have read" : "To read";
}

function addBookToLibrary(name, author, pageCount, hasRead) {
    const book = new Book(name, author, pageCount, hasRead);
    myLibrary.push(book);
}

function removeBook(e) {
    const bookRow = e.currentTarget.parentNode.parentNode;
    const bookRowIndex = Array.prototype.indexOf.call(bookTableBody.children, bookRow);
    myLibrary.splice(bookRowIndex, 1);
    bookTableBody.removeChild(bookRow);
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


function displayBookToTable(book) {
    const bookRow = document.createElement("tr");
    const bookProps = Object.keys(book);
    for (let i = 0; i < bookProps.length; i++) {
        const bookCell = document.createElement("td");
        bookCell.textContent = book[bookProps[i]];
        bookRow.appendChild(bookCell);
    }
    bookRow.appendChild(createRemoveCell());
    bookTableBody.appendChild(bookRow);
}

function displayLibraryToTable() {
    const bookTableBody = document.querySelector("#book-table > tbody");
    myLibrary.forEach(displayBookToTable);
}

const addBookBtn = document.querySelector("#add-book");
const addBookDlg = document.querySelector("dialog");
addBookBtn.addEventListener("click", e => {
    addBookDlg.showModal();
})

const confirmBtn = addBookDlg.querySelector("#confirm-btn");
const addBookInputs = addBookDlg.querySelectorAll("input");
const dialogForm = addBookDlg.querySelector("form");

confirmBtn.addEventListener("click", () => {
    const inputValues = [];

    addBookInputs.forEach(input => {
        const inputValueProp =
            input.type === "checkbox" ? 
            "checked" : "value";
        let inputValue = input[inputValueProp];

        inputValues.push(inputValue);
    });

    addBookToLibrary.apply(null, inputValues);
    displayBookToTable(myLibrary[myLibrary.length - 1]);
    dialogForm.reset();
});

const cancelBtn = addBookDlg.querySelector("#cancel-btn");
cancelBtn.addEventListener("click", dialogForm.reset.bind(dialogForm));

function test() {
    addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
    addBookToLibrary("Lord of the Flies", "William Golding", 224, true);
    displayLibraryToTable();
}

test();