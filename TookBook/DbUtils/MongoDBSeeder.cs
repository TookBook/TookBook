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

        private readonly IMongoCollection<Category> _categoryCollection;

        public MongoDBSeeder()
        {
            // TODO: Use db and collection names from the MongoDBSettings file somehow? Instead of hardcoding the names.
            //_database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            //_booksCollection = _database.GetCollection<Book>(mongoDBSettings.Value.BookCollectionName);

            MongoClient client = new("mongodb://localhost:27017");

            _database = client.GetDatabase("TookBook");

            _userCollection = _database.GetCollection<User>("Users");

            _booksCollection = _database.GetCollection<Book>("Books");

            _categoryCollection = _database.GetCollection<Category>("Categories");
        }

        /// <summary>
        /// Gets the filepath of JSON files stored in the root directory. Reads and deserializes into a BSON document. Lastly, inserts the BSON document into the appropriate collection.
        /// </summary>



        public async void ReseedMockData()
        {
            // TODO: Error handling
            string bookSeedDataText = GetMockDataFromFile("booksSeedData.json");
            string userSeedDataText = GetMockDataFromFile("userSeedData.json");
            string categorySeedDataText = GetMockDataFromFile("categorySeedData.json");

            var bookCollectionDocument = BsonSerializer.Deserialize<IEnumerable<Book>>(bookSeedDataText);
            var userCollectionDocument = BsonSerializer.Deserialize<IEnumerable<User>>(userSeedDataText);
            var categoryCollectionDocument = BsonSerializer.Deserialize<IEnumerable<Category>>(categorySeedDataText);

            DropTookBookCollections();
            await _booksCollection.InsertManyAsync(bookCollectionDocument);
            await _userCollection.InsertManyAsync(userCollectionDocument);
            await _categoryCollection.InsertManyAsync(categoryCollectionDocument);
        }

        /// <summary>
        /// Gets the filepath of JSON files stored in the root directory. Reads and deserializes into a BSON document. Lastly, inserts the BSON document into the appropriate collection.
        /// </summary>
        public async void LoadUserMockData()
        {

            string userSeedDataText = GetMockDataFromFile("userSeedData.json");

            var userCollectionDocument = BsonSerializer.Deserialize<IEnumerable<User>>(userSeedDataText);

            await _userCollection.InsertManyAsync(userCollectionDocument);
        }

        /// <summary>
        /// Gets the filepath of JSON files stored in the root directory. Reads and deserializes into a BSON document. Lastly, inserts the BSON document into the appropriate collection.
        /// </summary>
        public async void LoadCategoryMockData()
        {
            string categorySeedDataText = GetMockDataFromFile("categorySeedData.json");

            var categoryCollectionDocument = BsonSerializer.Deserialize<IEnumerable<Category>>(categorySeedDataText);

            await _categoryCollection.InsertManyAsync(categoryCollectionDocument);
        }
        
        /// <summary>
        /// Gets the filepath of JSON files stored in the root directory. Reads and deserializes into a BSON document. Lastly, inserts the BSON document into the appropriate collection.
        /// </summary>
         public async void LoadBookMockData()
         {
            string bookySeedDataText = GetMockDataFromFile("categorySeedData.json");

            var bookCollectionDocument = BsonSerializer.Deserialize<IEnumerable<Book>>(bookSeedDataText);

            await _booksCollection.InsertManyAsync(booksCollectionDocument);
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
        /// Reads text from a file on the disk using StreamReader.
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
        /// Helper method to drop all collections manually.
        /// </summary>
        public void DropTookBookCollections()
        {
            DropDbCollection("Books");
            DropDbCollection("Categories");
            DropDbCollection("Users");
        }

        /// <summary>
        /// Drops a database collection.
        /// </summary>
        /// <param name="collectionName">Name of the collection to be dropped.</param>
        public void DropDbCollection(string collectionName) => _database.DropCollection(collectionName);
    }
}
