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

    /// <summary>
    /// Initializes an instance of the MongoDBSeeder class. Meant to connect to and seed a MongoDB database in a local environment.
    /// </summary>
    public class MongoDBSeeder
    {
        private readonly IMongoDatabase _database;

        private readonly IMongoCollection<Book> _booksCollection;

        private readonly IMongoCollection<User> _userCollection;

        public MongoDBSeeder()
        {
            // TODO: Use db and collection names from the MongoDBSettings file somehow? Instead of hardcoding the names.
            //_database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            //_booksCollection = _database.GetCollection<Book>(mongoDBSettings.Value.BookCollectionName);

            MongoClient client = new("mongodb://localhost:27017");

            _database = client.GetDatabase("TookBook");

            _userCollection = _database.GetCollection<User>("Users");

            _booksCollection = _database.GetCollection<Book>("Books");
        }

        /// <summary>
        /// Gets the filepath of JSON files stored in the root directory. Reads and deserializes into a BSON document. Lastly, inserts the BSON document into the appropriate collection.
        /// </summary>
        public async void LoadMockData()
        {
            // TODO: Error handling
            //string filePath = Environment.CurrentDirectory + @"\booksSeedData.json";
            //string bookSeedData = ReadMockDataFromFile(filePath);

            string bookSeedDataText = GetMockDataFromFile("booksSeedData.json");

            var bookCollectionDocument = BsonSerializer.Deserialize<IEnumerable<Book>>(bookSeedDataText);

            await _booksCollection.InsertManyAsync(bookCollectionDocument);
        }

        /// <summary>
        /// Gets text from the chosen file.
        /// </summary>
        /// <param name="filename">The name of the file to read text from.</param>
        /// <returns>The text of the file as a string.</returns>
        public string GetMockDataFromFile(string filename)
        {
            string filePath = Environment.CurrentDirectory + @$"\{filename}";
            return ReadTextFromFile(filePath);
        }

        /// <summary>
        /// Reads a file from disk using StreamReader.
        /// </summary>
        /// <param name="filePath">The file path.</param>
        /// <returns>The contents of the provided file as a string.</returns>
        public string ReadTextFromFile(string filePath)
        {
            // TODO: Error handling
            using StreamReader sr = new(filePath);
            return sr.ReadToEnd();
        }

        /// <summary>
        /// Drops a database collection.
        /// </summary>
        /// <param name="collectionName">Name of the collection to be dropped.</param>
        public void DropDbCollection(string collectionName) => _database.DropCollection(collectionName);
    }
}
