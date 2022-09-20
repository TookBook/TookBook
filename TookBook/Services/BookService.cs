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

        public async Task<List<Book>> GetAsync() => await _booksCollection.Find(_ => true).ToListAsync();


        public async Task<Book> GetByIdTest(string id) => await _booksCollection.Find(x => x.BookId == id).FirstOrDefaultAsync();



        /// <summary>
        /// Updates an existing book by using the sent in book-object.
        /// </summary>
        /// <param name="bookWithUpdatedInfo">The book to be updated.</param>
        public async Task UpdateBook(Book bookWithUpdatedInfo) => await _booksCollection.ReplaceOneAsync(x => x.BookId == bookWithUpdatedInfo.BookId, bookWithUpdatedInfo);

        /// <summary>
        /// Adds a new category to an existing boko.
        /// </summary>
        /// <param name="book">The book.</param>
        /// <param name="category">The category.</param>
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
