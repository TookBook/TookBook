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
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _userCollection = database.GetCollection<User>(mongoDBSettings.Value.UserCollectionName);
        }

        public async Task<List<User>> GetAsync()
        {
            return await _userCollection.Find(_user => true).ToListAsync();
        }

        public async Task<User> LoginAsync(string username, string password)
        {
            return await _userCollection.Find(o => o.UserName == username && o.Password == password).FirstAsync();
        }
        
        public async Task<User> ForgotPasswordAsync(string userOrMail)
        {
            return await _userCollection.Find(o => o.UserName == userOrMail || o.Mail == userOrMail).FirstAsync();
        }

        public async Task<User> ForgotUsernameAsync(string mail)
        {
            return await _userCollection.Find(o => o.Mail == mail).FirstAsync();
        }


        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }
    }
}
