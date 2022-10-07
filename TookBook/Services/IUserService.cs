using TookBook.Models;

namespace TookBook.Services
{
    public interface IUserService
    {
        Task AddUserAsync(string email, string username, string password);
        Task BlockUser(User userToBlock);
        Task ChangeUserPass(User userToChange, string newPassword);
        Task<bool> Demote(User user);
        Task<User> ForgotPasswordAsync(string usernameOrEmail);
        Task<User> ForgotUsernameAsync(string email);
        Task<List<User>> GetAsync();
        Task<User> GetUserById(string id);
        Task<bool> InactivateSeller(User user);
        Task<bool> InactivateUser(User user);
        Task<User> LoginAsync(string username, string password);
        Task<bool> Promote(User user);
        Task UnblockUser(User userToUnblock);
        Task UpdateUser(User userToUpdate);
    }
}