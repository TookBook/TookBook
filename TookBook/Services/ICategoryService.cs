using TookBook.Models;

namespace TookBook.Services
{
    public interface ICategoryService
    {
        Task AddCategory(Category category);
        Task DeleteCategory(Category categoryToDelete);
        Task<List<Category>> GetAsync();
        Task<Category> GetCategoryById(string id);
        Task<Category> GetCategoryByName(string name);
        Task<List<Category>> GetFilteredAsync(string keyword);
        Task UpdateCategory(Category categoryToUpdate);
        Task UpdateCategoryName(Category categoryToUpdate, string newCatName);
    }
}