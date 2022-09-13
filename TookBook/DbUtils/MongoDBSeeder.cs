namespace TookBook.DbUtils
{
    using Microsoft.Extensions.Options;
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization;
    using MongoDB.Driver;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Models;

    public class MongoDBSeeder
    {

        private readonly IMongoDatabase _database;

        private readonly IMongoCollection<Book> _booksCollection;

        private readonly IMongoCollection<User> _userCollection;

       

        public MongoDBSeeder()
        {
            
            MongoClient client = new MongoClient("mongodb://localhost:27017");
            //_database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            //_booksCollection = _database.GetCollection<Book>(mongoDBSettings.Value.BookCollectionName);

            _database = client.GetDatabase("TookBook");
            
            _userCollection = _database.GetCollection<User>("Users");
            
            _booksCollection = _database.GetCollection<Book>("Books");
        }

        public async void LoadMockData()
        {
           
            string filePath = Environment.CurrentDirectory + @"\booksSeedData.json";
            string rawText = ReadMockDataFromFile(filePath);

            var document = BsonSerializer.Deserialize<IEnumerable<Book>>(rawText);
            
            
            await _booksCollection.InsertManyAsync(document);

        }

        public string ReadMockDataFromFile(string filePath)
        {
            using StreamReader sr = new(filePath);
            return sr.ReadToEnd();
        }

    }
}
