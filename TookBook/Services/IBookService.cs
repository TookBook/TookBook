using TookBook.Models;

namespace TookBook.Services
{
    public interface IBookService
    {
        Task<Book> AddBookAsyncTest(string title, string category, string language, string authorFirstName, string authorLasName, int year, decimal price, string seller, string bookInfo, int amountOfBooks);
        Task AddCategoryToBook(Book book, Category category);
        Task AddCategoryToBookByName(Book book, string categoryName);
        Task<bool> BuyBookAsync(Book book, bool usedBook);
        Task<string> CreateBook(Book bookToAdd);
        Task CreateBookAsync(Book bookToAdd);
        Task<bool> DeleteBook(Book bookToDelete, bool deleteUsedBook = false);
        Task<List<Book>> GetAsync();
        Task<Book> GetBookById(string id);
        Task<List<Book>> GetBooksByAuthorAsync(string author);
        Task<List<Book>> GetBooksInCategoryAsync(string category);
        Task<Book> GetByTitle(string title);
        Task<List<Book>> GetFilteredAsync(string keyword);
        Task PurgeBook(Book bookToRemove);
        Task PurgeEmptyBooks();
        Task<Book> TestToAddBook();
        Task UpdateBook(Book bookWithUpdatedInfo);
    }
}