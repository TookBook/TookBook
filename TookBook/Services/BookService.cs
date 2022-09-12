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
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _booksCollection = database.GetCollection<Book>(mongoDBSettings.Value.BookCollectionName);
        }
        
        public async Task<List<Book>> GetAsync() {
            return await _booksCollection.Find(_book => true).ToListAsync();
        }

        public async Task<List<Book>> GetBooksInCategoryAsync(string category)
        {
            return await _booksCollection.Find(_book => _book.Category == category).ToListAsync();
        }

        public async Task<List<Book>> GetBooksInCategoryAsync(string category)
        {
            return await _booksCollection.Find(_book => _book.Category == category).ToListAsync();
        }

        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }


    }
}
