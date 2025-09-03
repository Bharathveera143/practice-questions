enum BookStatus {
    Available = "Available",
    Borrowed = "Borrowed"
}

interface Book {
    id: number;
    title: string;
    author: string;
    status: BookStatus;
}

class Library {
  private books: Book[] = [];

  constructor(initialBooks: Book[]) {
    this.books = initialBooks;
  }

  // List all books
  listBooks() {
    console.log("\n📚 Library Books:");
    this.books.forEach((book) => {
      console.log(
        `ID: ${book.id}, Title: "${book.title}", Author: ${book.author}, Status: ${book.status}`
      );
    });
  }

borrowBook(bookId: number): void {
    const book = this.books.find((b) => b.id === bookId);
    if(!book) {
        console.log("❌ Book not found!");
        return;
    }
    if(book.status === BookStatus.Borrowed){
    console.log(`⚠️ Book "${book.title}" is already borrowed.`);
    return;
}
book.status = BookStatus.Borrowed;
console.log(`✅ You borrowed "${book.title}".`);
    
}

returnBook(bookId: number): void {

    const book = this.books.find((b) => b.id === bookId);
    if(!book) {
        console.log("❌ Book not found!");
        return;

    }
    if(book.status === BookStatus.Available){
    console.log(`⚠️ Book "${book.title}" was not borrowed.`);
    return;
}
book.status = BookStatus.Available;
console.log(`✅ You returned "${book.title}".`);
    
}
}


const myLibrary = new Library([
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", status: BookStatus.Available },
    { id: 2, title: "1984", author: "George Orwell", status: BookStatus.Available },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", status: BookStatus.Borrowed },
])


myLibrary.listBooks();


myLibrary.borrowBook(1);   // Borrow "The Hobbit"
myLibrary.borrowBook(3);   // Try to borrow "Clean Code" (already borrowed)
myLibrary.returnBook(3);   // Return "Clean Code"
myLibrary.returnBook(2);   // Return "1984" (was never borrowed)

myLibrary.listBooks();
