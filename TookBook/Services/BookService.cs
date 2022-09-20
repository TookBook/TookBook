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

        public async Task UpdateBook(string oldBookId, Book bookWithUpdatedInfo) => await _booksCollection.ReplaceOneAsync(x => x.BookId == oldBookId, bookWithUpdatedInfo);

        public async Task AddBookToCategory(Book book, Category category)
        {
            // TODO: Correct "id"-name?
            var filter = Builders<Book>.Filter.Eq("_id", book.BookId);
            var update = Builders<Book>.Update.AddToSet("categories", category);
            await _booksCollection.UpdateOneAsync(filter, update);
        }

        public async Task<bool> DeleteBook(Book bookToDelete, bool deleteUsedBook = false)
        {
            // TODO: Use UpdateOne + set to decrease InStock new/used instead?
            var validUsedBooks = bookToDelete.InStock.Used > 0;
            var validNewBooks = bookToDelete.InStock.New > 0;
            //if (deleteUsedBook && validUsedBooks) bookToDelete.InStock.Used--;
            //if (!deleteUsedBook && validNewBooks) bookToDelete.InStock.New--;
            if (deleteUsedBook && validUsedBooks)
            {
                bookToDelete.InStock.Used--;
                bookToDelete.InStock.Total--;
                await UpdateBook(bookToDelete.BookId, bookToDelete);
                return await Task.FromResult(true);
            }
            if (!deleteUsedBook && validNewBooks)
            {
                bookToDelete.InStock.New--;
                bookToDelete.InStock.Total--;
                await UpdateBook(bookToDelete.BookId, bookToDelete);
                return await Task.FromResult(true);
            }
                return await Task.FromResult(false);
        }

        public async Task PurgeBook(Book bookToRemove) => await _booksCollection.DeleteOneAsync(x => x.BookId == bookToRemove.BookId);

        public async Task PurgeEmptyBooks() => await _booksCollection.DeleteManyAsync(book => book.InStock.Total == 0);

    }
}
