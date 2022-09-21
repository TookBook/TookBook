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

        //testade en annan approach som jag inte fick funka än /Tiia
        //public async Task<User> EditProfileAsync(string username, string email, string password)
        //{
        //    var filter = Builders<User>.Filter.(x => x.UserName == username || x.Mail == email).FirstAsync();
        //    var update = Builders<User>.Update.Set("password", password)
        //                            .Set("username", username)
        //                            .Set("email", email);

        //    var result = await _userCollection.UpdateOneAsync(filter, update);
        //    return result;
        //}

        public async Task<User> EditProfileAsync(User updatedUser)
        {
            return await _userCollection.FindOneAndReplaceAsync(x => x.UserId == updatedUser.UserId, updatedUser);
        }




        ////TODO: add ADMIN id
        ///// <summary>
        ///// Gets a list containing all users
        ///// </summary>
        ///// <returns></returns>
        //public async Task<List<User>> ListUsersAsync()
        //{
        //    return await _userCollection.Find(_user => true).ToListAsync();
        //}

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

        //public async Task<User> ChangePasswordAsync(string newPassword, string confirm)
        //{

        //}

        //public async Task<User> ActivateAccountAsync()
    }

        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }
    
}
