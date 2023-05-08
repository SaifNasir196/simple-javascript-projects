class Book {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }
}

class Display {
    add(book) {
        let books
        let array = localStorage.getItem('books')
        if (array != null) {
            books = JSON.parse(array)
        }
        else {
            books = []
        }
        if (book != false) {
            books.push(book)
            localStorage.setItem('books', JSON.stringify(books))
        }
        tableBody.innerHTML = ''
        books.forEach(function (book, index) {
            let uiString = `<tr onclick=Display.showBook(index) id="${index}" >
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td><button class="btn btn-outline-primary btn-sm" onclick="Display.deleteBook(${index})">Delete</button> </td>
            </tr>`;
            tableBody.innerHTML += uiString;
        })
    }
    clear() {
        let libForm = document.getElementById('libraryform');
        libForm.reset()
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2 || book.genre.length < 2) { return false }
        else { return true }
    }
    showMsg(type, msg) {
        let message = document.getElementById('msg')
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show " role="alert">
                                ${msg}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`
        setTimeout(function () { message.innerHTML = '' }, 3000);
    }
    static deleteBook(index) {
        let books = JSON.parse(localStorage.getItem('books'))
        books.splice(index,1)
        localStorage.setItem('books', JSON.stringify(books))
        display.add(false)
    }

    static showBook(){
        console.log('this is show book func');
    }
}

// submit event listener to libraryform
let tableBody = document.getElementById('tBody');
let display = new Display()
display.add(false)
let libForm = document.getElementById('libraryform');
libForm.addEventListener('submit', libformSubmit);

function libformSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('BookName').value;
    let author = document.getElementById('Author').value;

    const radios = document.getElementsByName('type');
    let genre = ''
    for (var radio of radios) {
        if (radio.checked) { genre = radio.value }
    }

    let book = new Book(name, author, genre);
    if (display.validate(book)) {
        display.add(book)
        display.clear()
        display.showMsg('success', 'Your book has been added successfully')
    }
    else {
        display.showMsg('warning', 'You should check in on some of those fields below')
        display.clear()
    }
}