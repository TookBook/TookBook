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
        private readonly CategoryService _categoryService; //TODO: l�gg till alla services

        public CategoryController(CategoryService categoryService) => _categoryService = categoryService;

        [HttpGet("AllCategories")]
        public async Task<ActionResult<List<Category>>> Get()
        {
            var categories = await _categoryService.GetAsync();
            if (categories == null)
                return NotFound();
            return Ok(categories);
        } //Do we need to return ok? cant we just return the list even if empty, frontend wont care

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
    };
}