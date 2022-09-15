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

        public async Task<Book> UpdateBook(Book book)
        {

            return null;
        }

        public async Task<Book> DeleteBook(Book bookToDelete)
        {
            // TODO: How to keep track of which stock to decrease? Don't decrease both by one
            var newStock = bookToDelete.InStock.New;
            var usedStock = bookToDelete.InStock.Used;
            if (newStock > 0) newStock -= 1;
            if (usedStock > 0) usedStock -= 1;
            
            return null;
        }

        public async Task PurgeBook(Book bookToRemove) => await _booksCollection.DeleteOneAsync(x => x.BookId == bookToRemove.BookId);

        public async Task<List<Book>> PurgeEmptyBooks()
        {
            // TODO: Null stuff here or in controller?
            return await _booksCollection.Find(book => book.InStock.Total == 0).ToListAsync();
            
            
        }

        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }


    }
}
