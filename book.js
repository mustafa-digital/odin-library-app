


/*
    Adding event listeners for the modals


*/
const addBookBtn = document.querySelector(".add-book-btn");
const closeAddBookBtn = document.querySelector(".close-add-book");
const modalAddBook = document.querySelector(".add-book");

const aboutBtn = document.querySelector(".about-btn");
const closeAboutBtn = document.querySelector(".close-about");
const modalAbout = document.querySelector(".about");

const statsBtn = document.querySelector(".stats-btn");
const closeStatsBtn = document.querySelector(".close-stats");
const modalStats = document.querySelector(".stats");


const popup = document.querySelector(".add-book-popup");
const mainPopup = document.querySelector(".add-book-popup-main");

addBookBtn.addEventListener("click", () => {
    modalAddBook.style.display = "flex";
});

closeAddBookBtn.addEventListener("click", () => {
    modalAddBook.style.display = "none";
});

aboutBtn.addEventListener("click", () => {
    modalAbout.style.display = "flex";
});

closeAboutBtn.addEventListener("click", () => {
    modalAbout.style.display = "none";
});

statsBtn.addEventListener("click", () => {
    modalStats.style.display = "flex";
});

closeStatsBtn.addEventListener("click", () => {
    modalStats.style.display = "none";
});

window.addEventListener("click", (e) => {
    modalList = document.querySelectorAll(".modal");
    modalList.forEach(element => {
        if (e.target == element){
            element.style.display = "none";
        }
    });

});

/*
Library array functions go here

*/

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let readString = "";
        if (read) {
            readString = "read";
        }
        else {
            readString = "not read yet";
        }
        return `${this.title} by ${this.author}, ${pages}, ${readString}`;
    }
}

function addBookToLibrary(book) {

    myLibrary.push(book);
}

function addDefaultBooks() {
    let hobbit = new Book("The Hobbit", "JRR Tolkien", 295, false);
    let creatures = new Book("Creatures: The Quest to Create Artificial Life", "Stephen Grand", 224, false);
    let chatgpt = new Book("What is ChatGPT Doing ... and Why Does it Work?", "Stephen Wolfram", 112, false);
    let typeScript = new Book("TypeScript in 50 Lessons", "Stefan Baumgartner", 369, false);
    let wowDiary = new Book("The World of Warcraft Diary: A Journal of Game Development", "John Staats", 400, false);

    addBookToLibrary(hobbit);
    addBookToLibrary(creatures);
    addBookToLibrary(chatgpt);
    addBookToLibrary(typeScript);
    addBookToLibrary(wowDiary);
}

document.addEventListener("DOMContentLoaded", addDefaultBooks);

let form = document.getElementById("add-book-form");

function clearInputs(bookTitleInput, bookAuthorInput, numPagesInput, readCheckInput) {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    numPagesInput.value = "";
    readCheckInput.checked = false;
}

form.addEventListener("submit", function(e) {
    const bookTitleInput = document.getElementById("title");
    const bookAuthorInput = document.getElementById("author");
    const numPagesInput = document.getElementById("pages");
    const readCheckInput = document.getElementById("read");

    let bookTitle = bookTitleInput.value;
    let bookAuthor = bookAuthorInput.value;
    let numPages = numPagesInput.value;
    let readCheck = readCheckInput.value;

    let newBook = new Book(bookTitle, bookAuthor, numPages, readCheck);

    addBookToLibrary(newBook);

    clearInputs(bookTitleInput, bookAuthorInput, numPagesInput, readCheckInput); // clear inputs for next book submission
    
    modalAddBook.style.display = "none"; // close the modal after submitting

    e.preventDefault(); // prevent form submission from refreshing page
});
