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

        public async Task UpdateUser(User userToUpdate) => await _userCollection.ReplaceOneAsync(x => x.UserId == userToUpdate.UserId, userToUpdate);

        public async Task BlockUser(User userToBlock)
        {
            //TODO: There has to be a simpler way of updating a single property.. Alternative: Replace entire user.
            var filter = Builders<User>.Filter.Eq("_id", userToBlock.UserId);
            var update = Builders<User>.Update.Set("isblocked", true);
            await _userCollection.UpdateOneAsync(filter, update);
        }

        public async Task UnBlockUser(User userToUnblock)
        {
            //TODO: Replace entire user, or update single field in user object using filter/update.set?
            userToUnblock.IsBlocked = false;
            await UpdateUser(userToUnblock);
        }

        public async Task ChangeUserPass(User userToChange, string newPassword)
        {
            // TODO: Password validation?
            userToChange.Password = newPassword;
            await UpdateUser(userToChange);
        }

        public async Task Promote(User user)
        {
            user.UserType.IsAdmin = true;
            await UpdateUser(user);
        }

        public async Task Demote(User user)
        {
            user.UserType.IsAdmin = false;
            await UpdateUser(user);
        }

        public async Task InactivateUser(User user)
        {
            user.IsActive = false;
            await UpdateUser(user);
        }
        public async Task InactivateSeller(User user)
        {
            user.UserType.IsSeller = false;
            await UpdateUser(user);
        }

    }
}
