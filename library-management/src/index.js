var BookStatus;
(function (BookStatus) {
    BookStatus["Available"] = "Available";
    BookStatus["Borrowed"] = "Borrowed";
})(BookStatus || (BookStatus = {}));
var Library = /** @class */ (function () {
    function Library(initialBooks) {
        this.books = [];
        this.books = initialBooks;
    }
    // List all books
    Library.prototype.listBooks = function () {
        console.log("\n📚 Library Books:");
        this.books.forEach(function (book) {
            console.log("ID: ".concat(book.id, ", Title: \"").concat(book.title, "\", Author: ").concat(book.author, ", Status: ").concat(book.status));
        });
    };
    Library.prototype.borrowBook = function (bookId) {
        var book = this.books.find(function (b) { return b.id === bookId; });
        if (!book) {
            console.log("❌ Book not found!");
            return;
        }
        if (book.status === BookStatus.Borrowed) {
            console.log("\u26A0\uFE0F Book \"".concat(book.title, "\" is already borrowed."));
            return;
        }
        book.status = BookStatus.Borrowed;
        console.log("\u2705 You borrowed \"".concat(book.title, "\"."));
    };
    Library.prototype.returnBook = function (bookId) {
        var book = this.books.find(function (b) { return b.id === bookId; });
        if (!book) {
            console.log("❌ Book not found!");
            return;
        }
        if (book.status === BookStatus.Available) {
            console.log("\u26A0\uFE0F Book \"".concat(book.title, "\" was not borrowed."));
            return;
        }
        book.status = BookStatus.Available;
        console.log("\u2705 You returned \"".concat(book.title, "\"."));
    };
    return Library;
}());
var myLibrary = new Library([
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", status: BookStatus.Available },
    { id: 2, title: "1984", author: "George Orwell", status: BookStatus.Available },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", status: BookStatus.Borrowed },
]);
myLibrary.listBooks();
myLibrary.borrowBook(1); // Borrow "The Hobbit"
myLibrary.borrowBook(3); // Try to borrow "Clean Code" (already borrowed)
myLibrary.returnBook(3); // Return "Clean Code"
myLibrary.returnBook(2); // Return "1984" (was never borrowed)
myLibrary.listBooks();
