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

    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = database.GetCollection<User>(mongoDBSettings.Value.UserCollectionName);
        }

        public async Task<List<User>> GetAsync()
        {
            return await _userCollection.Find(_user => true).ToListAsync();
        }
        
        //test
        public async Task<User> GetUserById(string id)
        {
            return await _userCollection.Find(x => x.UserId == id).FirstOrDefaultAsync();
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


        //TODO: add ADMIN id /Tiia
        /// <summary>
        /// Gets a list containing all users
        /// </summary>
        /// <returns></returns>
        public async Task<List<User>> ListUsersAsync()
        {
            return await _userCollection.Find(_user => true).ToListAsync();
        }

        //ska man söka med userId eller namn och email (så som det är nu) eller skicka in hela user? /Tiia
        /// <summary>
        /// Finds user by identifier (either userName och email)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<User> ShowProfileAsync(string userIdentifier)
        {
            return await _userCollection.Find(_user => _user.UserName == userIdentifier || _user.Mail==userIdentifier).FirstAsync();
        }

        //får inte denna att funka /Tiia
        //public async Task<User> ChangePasswordAsync(string username, string newPassword, string confirm)
        //{
        //    return await _userCollection.UpdateOneAsync(x => x.UserName == username,
        //        Builders<User>.Update
        //        .Set(x => x.Password, newPassword));
        //}
        
        public async Task ActivateAccountAsync(User accountToActivate)
        {
            var filter = Builders<User>.Filter.Eq(x => x.UserId, accountToActivate.UserId);
            var update = Builders<User>.Update.Set(x => x.IsActive, true);
            await _userCollection.UpdateOneAsync(filter, update);
        }
    }
}
