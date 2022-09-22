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

    public class BookService
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

        //Tested in swagger and does not work /Max
        /// <summary>
        /// Gets a list of books in a certain category.
        /// </summary>
        /// <param name="category"></param>
        /// <returns>List of books in a category.</returns>
        public async Task<List<Book>> GetBooksInCategoryAsync(Category category)
        {
            return await _booksCollection.Find(_book => _book.Categories.Contains(category)).ToListAsync();
        }

        //Tested in swagger and does not work /Max
        // Foreach does not work with _booksCollection and First() is not valid in swagger
        // so idk how to get to authors[]
        /// <summary>
        /// Gets a list of books by a certain author.
        /// </summary>
        /// <param name="author"></param>
        /// <returns>List of books made by a certain author.</returns>
        public async Task<List<Book>> GetBooksByAuthorAsync(string author)
        {
            return await _booksCollection.Find(_book =>
            _book.Authors.FirstOrDefault().FirstName.ToLower().Contains(author.ToLower()) || 
            _book.Authors.FirstOrDefault().LastName.ToLower().Contains(author.ToLower())).ToListAsync();
        }

        //public async Task<List<Book>> GetBooksByAuthorAsyncTest(string authorFirstname)
        //{
        //    var searchProjection = Builders<Book>.Projection.Expression(x => x.Authors.Where(author => author.FirstName == authorFirstname));

        //    return _booksCollection.Find(_ => true).Project(searchProjection).ToList();
        //}


        //Program crash when called in Controller. Have not tested in swagger
        /// <summary>
        /// Checks if buying a book is possible
        /// </summary>
        /// <param name="book">Book to be purchased</param>
        /// <param name="user">User who wishes to buy book</param>
        /// <param name="used">true == used book. false == new book</param>
        /// <returns>true if book is purchasable, else false</returns>
        //public async Task<bool> BuyBookAsync(Book book, User user, bool used) //should have "used" bool?
        //{
        //    //if user is neither seller or admin
        //    if (user.UserType.IsSeller == false && user.UserType.IsAdmin == false)
        //    {
        //        if (used) return book.InStock.Used > 0;
        //        if (!used) return book.InStock.New > 0;
        //    }
        //    return false;
        //}

        // Testversion av ovan @Max
        public async Task<bool> BuyBookAsyncTestTestTest(Book book, bool usedBook)
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
        /// Adds a new category to an existing book.
        /// </summary>
        /// <param name="book">The book to be updated.</param>
        /// <param name="category">The category</param>
        public async Task AddBookToCategory(Book book, Category category)
        {
            // TODO: Correct "id"-name?
            var filter = Builders<Book>.Filter.Eq("_id", book.BookId);
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
            // TODO: Use UpdateOne + set to decrease InStock new/used instead?
            var validUsedBooks = bookToDelete.InStock.Used > 0;
            var validNewBooks = bookToDelete.InStock.New > 0;
            if (deleteUsedBook && validUsedBooks)
            {
                bookToDelete.InStock.Used--;
                bookToDelete.InStock.Total--;
                await UpdateBook(bookToDelete);
                return await Task.FromResult(true);
            }
            if (!deleteUsedBook && validNewBooks)
            {
                bookToDelete.InStock.New--;
                bookToDelete.InStock.Total--;
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
        public async Task PurgeEmptyBooks() => await _booksCollection.DeleteManyAsync(book => book.InStock.Total == 0);

    }
}
