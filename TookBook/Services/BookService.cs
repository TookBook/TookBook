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

        public async Task<List<Book>> GetAsync() {
            return await _booksCollection.Find(_book => true).ToListAsync();
        }

        public async Task<Book> GetByIdTest(string id)
        {
            return  await _booksCollection.Find(x => x.BookId == id).FirstOrDefaultAsync();
        }

        public async Task UpdateBook(string oldBookId, Book bookWithUpdatedInfo)
        {
            await _booksCollection.ReplaceOneAsync(x => x.BookId == oldBookId, bookWithUpdatedInfo);
        }

        public async Task<bool> DeleteBook(Book bookToDelete, bool deleteUsedBook)
        {
            // TODO: Update book, or does it happen automatically? Decrease total amount of books from here or in InStock obj?
            // Use UpdateOne + set to decrease InStock new/used instead?
            var usedBooks = bookToDelete.InStock.Used;
            var newBooks = bookToDelete.InStock.New;
            if (deleteUsedBook && usedBooks > 0)
            {
                bookToDelete.InStock.Used--;
                return await Task.FromResult(true);
            }

            if (newBooks > 0 && !deleteUsedBook)
            {
                bookToDelete.InStock.New--;
                return await Task.FromResult(true);
            }
            await UpdateBook(bookToDelete.BookId, bookToDelete);
            return await Task.FromResult(false);
        }

        public async Task PurgeBook(Book bookToRemove) => await _booksCollection.DeleteOneAsync(x => x.BookId == bookToRemove.BookId);

        public async Task PurgeEmptyBooks() => await _booksCollection.DeleteManyAsync(book => book.InStock.Total == 0);

        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }


    }
}
