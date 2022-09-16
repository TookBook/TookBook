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

        public async Task<List<User>> GetAsync()
        {
            return await _userCollection.Find(_user => true).ToListAsync();
        }

        public async Task BlockUser(User userToBlock)
        {
            //TODO: There has to be a simpler way of updating a single property..
            var filter = Builders<User>.Filter.Eq("_id", userToBlock.UserId);
            var update = Builders<User>.Update.Set("isblocked", true);
            await _userCollection.UpdateOneAsync(filter, update);
        }

    }
}
