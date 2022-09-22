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
        private readonly CategoryService _categoryService; //TODO: lägg till alla services

        public CategoryController(CategoryService categoryService) => _categoryService = categoryService;

        //Tested in swagger /Max
        [HttpGet("AllCategories")]
        public async Task<ActionResult<List<Category>>> Get()
        {
            var categories = await _categoryService.GetAsync();
            if (categories == null)
                return NotFound();
            return Ok(categories);
        } //Do we need to return ok? cant we just return the list even if empty, frontend wont care

        //Tested in swagger /Max
        [HttpGet("FilteredCategories")]
        public async Task<ActionResult<List<Category>>> GetFiltered(string keyword)
        {
            var categories = await _categoryService.GetFilteredAsync(keyword);
            if (categories == null)
                return NotFound();
            return Ok(categories);
        }
    };
}