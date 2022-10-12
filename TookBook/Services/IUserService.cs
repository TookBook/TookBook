using TookBook.Models;

namespace TookBook.Services
{
    public interface IUserService
    {
        Task ActivateAccountAsync(User accountToActivate);
        Task<User> AddUserAsync(string username, string email, string password);
        Task BlockUser(User userToBlock);
        Task ChangeUserPass(User userToChange, string newPassword);
        Task<bool> Demote(User user);
        Task EditProfileAsync(string id, User updatedUser);
        Task<User> ForgotPasswordAsync(string usernameOrEmail);
        Task<User> ForgotUsernameAsync(string email);
        Task<List<User>> GetAsync();
        Task<User> GetUserById(string id);
        Task<User> GetUserByName(string name);
        Task<bool> InactivateSeller(User user);
        Task<bool> InactivateUser(User user);
        Task<List<User>> ListUsersAsync();
        Task<User> LoginAsync(string username, string password);
        Task<bool> Promote(User user);
        Task<User> RegisterUserAsync(string username, string email);
        Task<User> ShowProfileAsync(string userIdentifier);
        Task UnblockUser(User userToUnblock);
        Task UpdateUser(User userToUpdate);
        Task<bool> PromoteSeller(User user);
        Task<bool> DemoteSeller(User user);
    }
}