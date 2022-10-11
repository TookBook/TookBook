namespace TookBook.Services
{
    using Microsoft.Extensions.Options;
    using MongoDB.Driver;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection.Metadata.Ecma335;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Models;

    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = database.GetCollection<User>(mongoDBSettings.Value.UserCollectionName);
        }

        //Tested in swagger /Max
        /// <summary>
        /// Gets a list containing all users
        /// </summary>
        /// <returns> Lists of users </returns>
        public async Task<List<User>> GetAsync()
        {
            return await _userCollection.Find(_user => true).ToListAsync();
        }

        /// <summary>
        /// Gets a user by id
        /// </summary>
        /// <param name="id">The userId.</param>
        /// <returns></returns>
        public async Task<User> GetUserById(string id) => await _userCollection.Find(x => x.UserId == id).FirstOrDefaultAsync();

        //Tested in swagger /Max
        /// <summary>
        /// Returns the first user whos username and password matches the username and password input
        /// </summary>
        /// <param name="username"> the username</param>
        /// <param name="password"> the password</param>
        /// <returns> User if user exists, otherwise null</returns>
        public async Task<User> LoginAsync(string username, string password)
        {
            return await _userCollection.Find(o => o.UserName == username && o.Password == password).FirstOrDefaultAsync();
        }

        //Tested in swagger /Max
        /// <summary>
        /// If a user whos username or email matches input is found, return user. 
        /// </summary>
        /// <param name="usernameOrEmail"> username or email </param>
        /// <returns> User if user exists, otherwise null</returns>
        public async Task<User> ForgotPasswordAsync(string usernameOrEmail)
        {
            return await _userCollection.Find(o => o.UserName == usernameOrEmail || o.Mail == usernameOrEmail).FirstAsync();
        }

        //Tested in swagger /Max
        /// <summary>
        /// If a user whos email mathes input is found, return user.
        /// </summary>
        /// <param name="email">The email</param>
        /// <returns>User if user exists, otherwise null</returns>
        public async Task<User> ForgotUsernameAsync(string email)
        {
            return await _userCollection.Find(o => o.Mail == email).FirstAsync();
        }

        /// <summary>
        /// Updates a user.
        /// </summary>
        /// <param name="userToUpdate">The user to update.</param>
        public async Task UpdateUser(User userToUpdate) => await _userCollection.ReplaceOneAsync(x => x.UserId == userToUpdate.UserId, userToUpdate);

        /// <summary>
        /// Blocks a user.
        /// </summary>
        /// <param name="userToBlock">The user to block.</param>
        public async Task BlockUser(User userToBlock)
        {
            userToBlock.IsBlocked = true;
            await UpdateUser(userToBlock);
        }

        /// <summary>
        /// Unblocks a user.
        /// </summary>
        /// <param name="userToUnblock">The user to unblock.</param>
        public async Task UnblockUser(User userToUnblock)
        {
            userToUnblock.IsBlocked = false;
            await UpdateUser(userToUnblock);
        }

        public async Task ChangeUserPass(User userToChange, string newPassword)
        {
            userToChange.Password = newPassword;
            await UpdateUser(userToChange);
        }

        /// <summary>
        /// Promotes the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public async Task<bool> Promote(User user)
        {
            if (user.UserType.IsAdmin) return await Task.FromResult(false);
            user.UserType.IsAdmin = true;
            await UpdateUser(user);
            return await Task.FromResult(true);
        }

        /// <summary>
        /// Demotes the specified user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public async Task<bool> Demote(User user)
        {
            if (!user.UserType.IsAdmin) return await Task.FromResult(false);
            user.UserType.IsAdmin = false;
            await UpdateUser(user);
            return await Task.FromResult(true);
        }

        /// <summary>
        /// Inactivates the user.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public async Task<bool> InactivateUser(User user)
        {
            if (!user.IsActive) return await Task.FromResult(false);
            user.IsActive = false;
            await UpdateUser(user);
            return await Task.FromResult(true);
        }
        /// <summary>
        /// Inactivates the seller.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns></returns>
        public async Task<bool> InactivateSeller(User user)
        {
            if (!user.UserType.IsSeller) return await Task.FromResult(false);
            user.UserType.IsSeller = false;
            await UpdateUser(user);
            return await Task.FromResult(true);
        }

        public async Task<User> GetUserByName(string name) => await _userCollection.Find(x => x.UserName.ToLower() == name.ToLower()).FirstOrDefaultAsync();

        public async Task<User> AddUserAsync(string username, string email, string password)
        {
            User user = new();
            user.UserName = username;
            user.Mail = email;
            user.Password = password;
            UserType type = new();
            user.UserType = type;
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        /// <summary>
        /// Returns the user with the same username or email as the input
        /// </summary>
        /// <param name="username"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        public async Task<User> RegisterUserAsync(string username, string email)
        {
            return await _userCollection.Find(x => x.UserName == username || x.Mail == email).FirstOrDefaultAsync();
        }


        public async Task EditProfileAsync(string id, User updatedUser)
        {
            await _userCollection.ReplaceOneAsync(x => x.UserId == id, updatedUser);
        }


        /// <summary>
        /// Gets a list containing all users
        /// </summary>
        /// <returns></returns>
        public async Task<List<User>> ListUsersAsync()
        {
            return await _userCollection.Find(_user => true).ToListAsync();
        }


        /// <summary>
        /// Finds user by identifier (either userName och email)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<User> ShowProfileAsync(string userIdentifier)
        {
            return await _userCollection.Find(_user => _user.UserName == userIdentifier || _user.Mail == userIdentifier).FirstAsync();
        }

        public async Task ActivateAccountAsync(User accountToActivate)
        {
            var filter = Builders<User>.Filter.Eq(x => x.UserId, accountToActivate.UserId);
            var update = Builders<User>.Update.Set(x => x.IsActive, true);
            await _userCollection.UpdateOneAsync(filter, update);
        }
    }
}
