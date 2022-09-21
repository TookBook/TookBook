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

        //Program crash when called in Controller. Have not tested in swagger
        /// <summary>
        /// Checks if buying a book is possible
        /// </summary>
        /// <param name="book">Book to be purchased</param>
        /// <param name="user">User who wishes to buy book</param>
        /// <param name="used">true == used book. false == new book</param>
        /// <returns>true if book is purchasable, else false</returns>
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
