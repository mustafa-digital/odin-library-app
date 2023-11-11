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

function addBookToLibrary() {
    let title = prompt("Title?");
    let author = prompt("Author?");
    let pages = prompt("# of pages?");
    let read = prompt("Have you read this book? true/false");

    myLibrary.push(new Book(title, author, pages, read));
}

let hobbit = new Book("The Hobbit", "JRR Tolkien", 295, false);



const openBtn = document.querySelector(".add-book-btn");
const closeBtn = document.querySelector(".close-btn");
const popup = document.querySelector(".add-book-popup");
const mainPopup = document.querySelector(".add-book-popup-main");

openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    popup.style.cssText = "animation: slide-in 0.5s ease; animation-fill-mode: forwards;"
    mainPopup.style.cssText = "animation: slide-in 0.5s ease; animation-fill-mode: forwards;"
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.style.cssText = "animation: slide-out 0.5s ease; animation-fill-mode: forwards;"
    mainPopup.style.cssText = "animation: slide-out 0.5s ease; animation-fill-mode: forwards;"
});




