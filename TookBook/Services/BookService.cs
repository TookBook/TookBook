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

        //TODO Add comments
        public async Task<List<Book>> GetAsync() {
            return await _booksCollection.Find(_book => true).ToListAsync();
        }
        //TODO Add comments
        public async Task<List<Book>> GetBooksInCategoryAsync(Category category)
        {
            return await _booksCollection.Find(_book => _book.Categories == category).ToListAsync();
        }
        //TODO Add comments
        public async Task<List<Book>> GetBooksByAuthorAsync(Author author)
        {
            return await _booksCollection.Find(_book => _book.Authors == author).ToListAsync();
        }

        public async Task<bool> BuyBookAsync(Book book, User user, bool used) //should have "used" bool?
        {
            //if user is neither seller or admin
            if (user.UserType.IsSeller == false && user.UserType.IsAdmin == false)
            {
                if (used) return book.InStock.Used > 0;
                if (!used) return book.InStock.New > 0;
            }
            return false;
        }




        public async Task<Book> UpdateBook(Book book)
        {

            return null;
        }

        public async Task<Book> DeleteBook()
        {
            return null;
        }

        public async Task PurgeBook(Book bookToRemove) => await _booksCollection.DeleteOneAsync(x => x.BookId == bookToRemove.BookId);

        public async Task<Book> PurgeEmptyBooks()
        {
            return null;
        }

        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }


    }
}
