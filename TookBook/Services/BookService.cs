namespace TookBook.Services
{
    using Microsoft.Extensions.Options;
    using MongoDB.Driver;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Models;

    public class BookService : IBookService
    {
        private readonly IMongoCollection<Book> _booksCollection;

        public BookService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _booksCollection = database.GetCollection<Book>(mongoDBSettings.Value.BookCollectionName);
        }


        //Tested in swagger /Max
        /// <summary>
        /// Gets list of all books.
        /// </summary>
        /// <returns>List of all books</returns>
        public async Task<List<Book>> GetAsync()
        {
            return await _booksCollection.Find(_book => true).ToListAsync();
        }

        //Tested in swagger /Max
        /// <summary>
        /// Gets a filtered list with titles that contains the keyword.
        /// </summary>
        /// <param name="keyword">Input from user</param>
        /// <returns>Filtered book list</returns>
        public async Task<List<Book>> GetFilteredAsync(string keyword)
        {
            return await _booksCollection.Find(_book => _book.Title.ToLower().Contains(keyword.ToLower())).ToListAsync();  //kan man inte bara ta kalla på alla och sen filtrera i frontend? istället för att filtrera innan?
        }

        //test för att hämta en bok /Tiia
        public async Task<Book> GetByTitle(string title) => await _booksCollection.Find(x => x.Title == title).FirstOrDefaultAsync();

        //Tested in swagger /Max
        /// <summary>
        /// Gets a list of books in a certain category.
        /// </summary>
        /// <param name="category"></param>
        /// <returns>List of books in a category.</returns>
        public async Task<List<Book>> GetBooksInCategoryAsync(string category)
        {
            return await _booksCollection.Find(_book => _book.Categories.Any(_category => _category.CategoryName == category)).ToListAsync();

        }


        public async Task CreateBookAsync(Book bookToAdd)
        {
            await _booksCollection.InsertOneAsync(bookToAdd);
        }

        //test med att lägga till alla parametrar separat
        public async Task<Book> AddBookAsyncTest(string title, string category, string language, string authorFirstName, string authorLasName, int year, decimal price, string seller, string bookInfo, int amountOfBooks)
        {
            Book book = new();
            book.Title = title;
            Category category1 = new()
            {
                CategoryName = category
            };
            book.Language = language;
            Author author1 = new()
            {
                FirstName = authorFirstName,
                LastName = authorLasName
            };
            book.Year = year;
            book.Price = price;
            book.Seller = seller;
            book.BookInfo = bookInfo;

            if (book.Seller is "admin") //om det inte finns någon säljare så är det en bok som finns i lager
            {
                book.InStock = new InStock()
                {
                    New = amountOfBooks
                };
            }
            else
            {
                book.InStock = new InStock()
                {
                    Used = amountOfBooks
                };
            }

            await _booksCollection.InsertOneAsync(book);
            return book;
        }


        public async Task<Book> TestToAddBook()
        {
            Book book = new();
            await _booksCollection.InsertOneAsync(book);
            return book;
        }

        public async Task<string> CreateBook(Book bookToAdd)
        {
            bookToAdd.BookId = String.Empty;
            await _booksCollection.InsertOneAsync(bookToAdd);
            return bookToAdd.BookId;
        }

        //Alternativ som jag inte fick att fungera /Tiia
        //public async Task<Book> AddBookAsync(Book book, bool isNew, int amountOfAddedBooks)
        //{
        //    if (!isNew) book.InStock.Used += amountOfAddedBooks;
        //    else book.InStock.New += amountOfAddedBooks;
        //    await _booksCollection.InsertOneAsync(book);
        //    return book;
        //}


        //Tested in swagger /Max
        /// <summary>
        /// Gets a list of books by a certain author.
        /// </summary>
        /// <param name="author"></param>
        /// <returns>List of books made by a certain author.</returns>
        public async Task<List<Book>> GetBooksByAuthorAsync(string author)
        {
            return await _booksCollection.Find(_book =>
            _book.Authors.Any(_author => _author.FirstName.ToLower().Contains(author) ||
            _author.LastName.ToLower().Contains(author))).ToListAsync();
        }



        /// <summary>
        /// Checks if a book is able to be bought.
        /// </summary>
        /// <param name="book">The book to be bought</param>
        /// <param name="usedBook">if set to <c>true</c>, checks the used stock.</param>
        /// <returns></returns>
        public async Task<bool> BuyBookAsync(Book book, bool usedBook)
        {
            if (usedBook && book.InStock.Used > 0)
                return await Task.FromResult(true);
            if (!usedBook && book.InStock.New > 0)
                return await Task.FromResult(true);
            return await Task.FromResult(false);
        }

        /// <summary>
        /// Returns a book by searching for the bookId
        /// </summary>
        /// <param name="id">The bookId.</param>
        /// <returns></returns>
        public async Task<Book> GetBookById(string id) => await _booksCollection.Find(x => x.BookId == id).FirstOrDefaultAsync();


        /// <summary>
        /// Updates an existing book by using the sent in book-object.
        /// </summary>
        /// <param name="bookWithUpdatedInfo">The book to be updated.</param>
        public async Task UpdateBook(Book bookWithUpdatedInfo) => await _booksCollection.ReplaceOneAsync(x => x.BookId == bookWithUpdatedInfo.BookId, bookWithUpdatedInfo);

        /// <summary>
        /// Adds a new category to an existing book by adding the category name.
        /// </summary>
        /// <param name="book">The book to be updated.</param>
        /// <param name="category">The category</param>
        public async Task AddCategoryToBookByName(Book book, string categoryName)
        {
            var filter = Builders<Book>.Filter.Eq(x => x.BookId, book.BookId);
            var categoryFilter = Builders<Category>.Filter.Eq(x => x.CategoryName, categoryName);
            var update = Builders<Book>.Update.Push("categories", categoryFilter);
            await _booksCollection.UpdateOneAsync(filter, update);
        }

        /// <summary>
        /// Adds a new category to an existing book using a whole category object.
        /// </summary>
        /// <param name="book">The book to be updated.</param>
        /// <param name="category">The category</param>
        public async Task AddCategoryToBook(Book book, Category category)
        {
            var filter = Builders<Book>.Filter.Eq(x => x.BookId, book.BookId);
            var update = Builders<Book>.Update.AddToSet("categories", category);
            await _booksCollection.UpdateOneAsync(filter, update);
        }


        /// <summary>
        /// Deletes a book by decreasing the instock property by one.
        /// </summary>
        /// <param name="bookToDelete">The book to delete.</param>
        /// <param name="deleteUsedBook">if set to <c>true</c>, deletes a book from the used stock.</param>
        /// <returns>True if a book was succesfully deleted, false if no book was deleted.</returns>
        public async Task<bool> DeleteBook(Book bookToDelete, bool deleteUsedBook = false)
        {
            var validUsedBooks = bookToDelete.InStock.Used > 0;
            var validNewBooks = bookToDelete.InStock.New > 0;
            if (deleteUsedBook && validUsedBooks)
            {
                bookToDelete.InStock.Used--;
                await UpdateBook(bookToDelete);
                return await Task.FromResult(true);
            }
            if (!deleteUsedBook && validNewBooks)
            {
                bookToDelete.InStock.New--;
                await UpdateBook(bookToDelete);
                return await Task.FromResult(true);
            }
            return await Task.FromResult(false);
        }

        /// <summary>
        /// Deletes a book completely from the collection.
        /// </summary>
        /// <param name="bookToRemove">The book to remove.</param>
        public async Task PurgeBook(Book bookToRemove) => await _booksCollection.DeleteOneAsync(x => x.BookId == bookToRemove.BookId);

        /// <summary>
        /// Deletes all books in the collection where the total instock value is 0.
        /// </summary>
        public async Task PurgeEmptyBooks() => await _booksCollection.DeleteManyAsync(book => book.InStock.New == 0 && book.InStock.Used == 0);
    }
}
