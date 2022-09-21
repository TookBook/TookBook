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

    public class UserService
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

        //Tested in swagger /Max
        /// <summary>
        /// Returns the first user whos username and password matches the username and password input
        /// </summary>
        /// <param name="username"> the username</param>
        /// <param name="password"> the password</param>
        /// <returns> User if user exists, otherwise null</returns>
        public async Task<User> LoginAsync(string username, string password)
        {
            return await _userCollection.Find(o => o.UserName == username && o.Password == password).FirstAsync();
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
    }
}
