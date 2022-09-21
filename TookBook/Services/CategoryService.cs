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
            MongoClient client = new (mongoDBSettings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _categoryCollection = database.GetCollection<Category>(mongoDBSettings.Value.CategoryCollectionName);
        }

        //Tested in swagger, only returns empty array?? why??
        /// <summary>
        /// Gets a list containing all categories
        /// </summary>
        /// <returns> Lists of categories </returns>
        public async Task<List<Category>> GetAsync()
        {
            return await _categoryCollection.Find(_category => true).ToListAsync();
        }

        //Tested in swagger, only returns empty array?? why??
        /// <summary>
        /// Gets a filtered list with categories that contains the keyword.
        /// </summary>
        /// <param name="keyword">Input from user</param>
        /// <returns>Filtered category list.</returns>
        public async Task<List<Category>> GetFilteredAsync(string keyword)
        {
            return await _categoryCollection.Find(_category =>_category.CategoryName.Contains(keyword)).ToListAsync();  //kan man inte bara ta kalla på alla och sen filtrera i frontend? istället för att filtrera innan?
        }
    }
}