
﻿namespace TookBook.Services
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

        //Tested in swagger /Max
        /// <summary>
        /// Gets a list containing all categories
        /// </summary>
        /// <returns> Lists of categories </returns>
        public async Task<List<Category>> GetAsync()
        {
            return await _categoryCollection.Find(_category => true).ToListAsync();
        }

        //Tested in swagger /Max
        /// <summary>
        /// Gets a filtered list with categories that contains the keyword.
        /// </summary>
        /// <param name="keyword">Input from user</param>
        /// <returns>Filtered category list.</returns>
        public async Task<List<Category>> GetFilteredAsync(string keyword)
        {
            return await _categoryCollection.Find(_category =>_category.CategoryName.Contains(keyword)).ToListAsync();  //kan man inte bara ta kalla p� alla och sen filtrera i frontend? ist�llet f�r att filtrera innan?
        }

        /// <summary>
        /// Gets a category by id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// <returns></returns>
        public async Task<Category> GetCategoryById(string id) => await _categoryCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        /// <summary>
        /// Gets a category by name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public async Task<Category> GetCategoryByName(string name) => await _categoryCollection.Find(x => x.CategoryName.ToLower() == name.ToLower()).FirstOrDefaultAsync();

        /// <summary>
        /// Adds the sent in category to the database.
        /// </summary>
        /// <param name="category">The category.</param>
        public async Task AddCategory(Category category) => await _categoryCollection.InsertOneAsync(category);

        /// <summary>
        /// Updates the category.
        /// </summary>
        /// <param name="categoryToUpdate">The category to update.</param>
        public async Task UpdateCategory(Category categoryToUpdate) => await _categoryCollection.ReplaceOneAsync(x => x.Id == categoryToUpdate.Id, categoryToUpdate);

        /// <summary>
        /// Deletes the category.
        /// </summary>
        /// <param name="categoryToDelete">The category to delete.</param>
        public async Task DeleteCategory(Category categoryToDelete) => await _categoryCollection.DeleteOneAsync(x => x.Id == categoryToDelete.Id);

        /// <summary>
        /// Updates the name of the category.
        /// </summary>
        /// <param name="categoryToUpdate">The category to update.</param>
        /// <param name="newCatName">New name of the cat.</param>
        public async Task UpdateCategoryName(Category categoryToUpdate, string newCatName)
        {
            categoryToUpdate.CategoryName = newCatName;
            await UpdateCategory(categoryToUpdate);
        }
    }
}