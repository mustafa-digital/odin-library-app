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

function Book(title, author, pages, img, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.img = img;
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

Book.prototype.toggleRead = function () {
    if (this.read) {
        this.read = false;
    }
    else {
        this.read= true;
    }
}

function addBookToLibrary(book) {

    myLibrary.push(book);
}

function addDefaultBooks() {
    let hobbit = new Book("The Hobbit", "JRR Tolkien", 295, "https://i.harperapps.com/covers/9780261103344/y450-274.jpg", false);
    let creatures = new Book("Creatures: The Quest to Create Artificial Life", "Stephen Grand", 224, "https://m.media-amazon.com/images/I/71ic-tAhvHL._AC_UF1000,1000_QL80_.jpg", false);
    let chatgpt = new Book("What is ChatGPT Doing ... and Why Does it Work?", "Stephen Wolfram", 112, "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1678822079i/123245371.jpg", true);
    let typeScript = new Book("TypeScript in 50 Lessons", "Stefan Baumgartner", 369, "https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7f03f50c-3414-487f-880e-9bb3e5542487/typescript-ebook-ipad-opt.png", false);
    let wowDiary = new Book("The World of Warcraft Diary: A Journal of Game Development", "John Staats", 400, "https://m.media-amazon.com/images/I/71Hrp5NeHtL._AC_UF1000,1000_QL80_.jpg", false);

    addBookToLibrary(hobbit);
    addBookToLibrary(creatures);
    addBookToLibrary(chatgpt);
    addBookToLibrary(typeScript);
    addBookToLibrary(wowDiary);

    createBookCards();
}

document.addEventListener("DOMContentLoaded", addDefaultBooks);

const main = document.querySelector(".main");
let form = document.getElementById("add-book-form");

function clearInputs(bookTitleInput, bookAuthorInput, numPagesInput, imgUrlInput, readCheckInput) {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    numPagesInput.value = "";
    imgUrlInput.value = "";
    readCheckInput.checked = false;
}

form.addEventListener("submit", function(e) {
    const bookTitleInput = document.getElementById("title");
    const bookAuthorInput = document.getElementById("author");
    const numPagesInput = document.getElementById("pages");
    const imgUrlInput = document.getElementById("image");
    const readCheckInput = document.getElementById("read");

    let bookTitle = bookTitleInput.value;
    let bookAuthor = bookAuthorInput.value;
    let numPages = numPagesInput.value;
    let imgUrl = imgUrlInput.value;
    let readCheck = readCheckInput.value;

    let newBook = new Book(bookTitle, bookAuthor, numPages, imgUrl, readCheck);

    addBookToLibrary(newBook);

    clearInputs(bookTitleInput, bookAuthorInput, numPagesInput, imgUrlInput, readCheckInput); // clear inputs for next book submission
    
    modalAddBook.style.display = "none"; // close the modal after submitting
    main.textContent = "";
    createBookCards();

    e.preventDefault(); // prevent form submission from refreshing page
});

function deleteBook(bookIndex) {
    console.log(bookIndex);
    console.log(myLibrary);
    myLibrary.splice(bookIndex, 1);
    console.log(myLibrary);
}

function createBookCards() {
    let index = 0;
    myLibrary.forEach(book => {
        
        const bookCardDiv = document.createElement("div");
        bookCardDiv.setAttribute("class", "book-card");
        bookCardDiv.setAttribute("data-index", `${index}`)

        const deleteBookButton = document.createElement("span");
        deleteBookButton.setAttribute("class", "delete-book-btn");
        deleteBookButton.setAttribute("title", "Delete");

        deleteBookButton.addEventListener("click", (bookCardDeleteEvent) => {
            const deleteBookModal = document.querySelector(".delete-book-modal");
            const warningBook = document.querySelector(".book-title-warning");
            warningBook.textContent = `${book.title}?`;

            const deleteBookCancel = document.querySelector(".delete-book-cancel");
            deleteBookCancel.addEventListener("click", () => {
                deleteBookModal.close();
                bookCardDeleteEvent = null;

                warningBook.textContent = "";
            });

            const deleteBookConfirm = document.querySelector(".delete-book-confirm");
            deleteBookConfirm.addEventListener("click", () => {
                deleteBook(bookCardDeleteEvent.target.parentElement.dataset.index);
                deleteBookModal.close();
                main.textContent = "";
                bookCardDeleteEvent = null;

                createBookCards();
            });
            
            deleteBookModal.showModal();
        });

        const titleHeader = document.createElement("h2");
        titleHeader.textContent = book.title;

        const authorHeader = document.createElement("h1");
        authorHeader.textContent = `by ${book.author}`;

        const bookImage = document.createElement("img");
        bookImage.setAttribute("class", "book-image");

        if (book.img == "") {
            bookImage.setAttribute("style", 'content: url("images/Placeholder_view_vector.svg");');
        }
        else {
            bookImage.setAttribute("style", `content: url("${book.img}");`);
        }

        const pagesHeader = document.createElement("h1");
        pagesHeader.textContent = `${book.pages} pages`;

        const readButton = document.createElement("button");
        if (book.read) {
            readButton.setAttribute("class", "read");
            readButton.textContent="Read";
        }
        else {
            readButton.setAttribute("class", "not-read");
            readButton.textContent="Not read yet";
        }

        readButton.addEventListener("click", (e) => {
            if(readButton.classList.contains("read")){
                readButton.removeAttribute("class", "read");
                readButton.setAttribute("class", "not-read");
                readButton.textContent="Not read yet";
            }
            else {
                readButton.removeAttribute("class", "not-read");
                readButton.setAttribute("class", "read");
                readButton.textContent="Read";
            }
            myLibrary[e.target.parentElement.dataset.index].toggleRead();
        });
        
        bookCardDiv.appendChild(deleteBookButton);
        bookCardDiv.appendChild(titleHeader);
        bookCardDiv.appendChild(authorHeader);
        bookCardDiv.appendChild(bookImage);
        bookCardDiv.appendChild(pagesHeader);
        bookCardDiv.appendChild(readButton);

        main.appendChild(bookCardDiv);
        index++;
    })
}
