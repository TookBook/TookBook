namespace TookBook.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using TookBook.Services;
    using TookBook.Models;

    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService; //TODO: l�gg till alla services

        public CategoryController(ICategoryService categoryService = null, CategoryService categoryService1 = null)
        {
            _categoryService = categoryService1 ?? categoryService;
        }

        //Tested in swagger /Max
        /// <summary>
        /// gets all categories
        /// </summary>
        /// <returns></returns>
        [HttpGet("AllCategories")]
        public async Task<ActionResult<List<Category>>> Get()
        {
            var categories = await _categoryService.GetAsync();
            if (categories == null)
                return NotFound();
            return Ok(categories);
        } //Do we need to return ok? cant we just return the list even if empty, frontend wont care

        //Tested in swagger /Max
        /// <summary>
        /// gets filtered categories
        /// </summary>
        /// <param name="keyword"></param>
        /// <returns></returns>
        [HttpGet("FilteredCategories")]
        public async Task<ActionResult<List<Category>>> GetFiltered(string keyword)
        {
            var categories = await _categoryService.GetFilteredAsync(keyword);
            if (categories == null)
                return NotFound();
            return Ok(categories);
        }

        /// <summary>
        /// Creates a new category in the database from the sent in JSON-object.
        /// </summary>
        /// <param name="newCategory">The new category.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> CreateCategory(Category newCategory)
        {
            var categoryExists = await _categoryService.GetCategoryByName(newCategory.CategoryName);
            if (categoryExists != null) return BadRequest("A category with that name already exists");
            await _categoryService.AddCategory(newCategory);
            return Ok();
        }

        /// <summary>
        /// Updates an existing category name.
        /// </summary>
        /// <param name="id">The ID of the category to update.</param>
        /// <param name="newCategoryname">The updated name of the category.</param>
        /// <returns></returns>
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> UpdateCategory(string id, string newCategoryname)
        {
            var categoryToUpdate = await _categoryService.GetCategoryById(id);
            if (categoryToUpdate == null) return NotFound();
            await _categoryService.UpdateCategoryName(categoryToUpdate, newCategoryname);
            return Ok();
        }

        /// <summary>
        /// Deletes an existing category.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> DeleteCategory (string id)
        {
            var categoryToDelete = await _categoryService.GetCategoryById(id);
            if (categoryToDelete == null) return NotFound();
            await _categoryService.DeleteCategory(categoryToDelete);
            return Ok();
        }
    };
}