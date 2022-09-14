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

    public class CategoryService
    {

        private readonly IMongoCollection<Category> _categoryCollection;

        public CategoryService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _categoryCollection = database.GetCollection<Category>(mongoDBSettings.Value.CategoryCollectionName);
        }

        public async Task<List<Category>> GetAsync()
        {
            return await _categoryCollection.Find(_category => true).ToListAsync();
        }

        public async Task<List<Category>> GetFilterAsync()
        {
            return await _categoryCollection.Find(_category => true).ToListAsync();  //kan man inte bara ta kalla på alla och sen filtrera? istället för att filtrera innan?
        }


        //public async Task CreateAsync(Book book) { }
        //public async Task AddToBookAsync(string id, string bookId) { }
        //public async Task DeleteAsync(string id) { }
    }
}