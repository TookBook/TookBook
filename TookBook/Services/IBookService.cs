using TookBook.Models;

namespace TookBook.Services
{
    public interface IBookService
    {
        Task AddCategoryToBook(Book book, Category category);
        Task AddCategoryToBookByName(Book book, string categoryName);
        Task<bool> BuyBookAsync(Book book, bool usedBook);
        Task<bool> DeleteBook(Book bookToDelete, bool deleteUsedBook = false);
        Task<List<Book>> GetAsync();
        Task<Book> GetBookById(string id);
        Task<List<Book>> GetBooksByAuthorAsync(string author);
        Task<List<Book>> GetBooksInCategoryAsync(string category);
        Task<List<Book>> GetFilteredAsync(string keyword);
        Task PurgeBook(Book bookToRemove);
        Task PurgeEmptyBooks();
        Task UpdateBook(Book bookWithUpdatedInfo);
    }
}