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
            MongoClient client = new(mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _categoryCollection = database.GetCollection<Category>(mongoDBSettings.Value.UserCollectionName);
        }



        public async Task<bool> AddCategory(string categoryName)
        {
            // TODO: Check if the category doesn't already exist using existing method?
            Category newCategory = new();
            newCategory.CategoryName = categoryName;

            var catAlreadyExist = _categoryCollection.Find(x => x.CategoryName == categoryName).FirstOrDefaultAsync();
            if (catAlreadyExist != null) return await Task.FromResult(false);
            await _categoryCollection.InsertOneAsync(newCategory);
            return await Task.FromResult(true);
        }
    }
}
