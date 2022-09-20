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
        private readonly CategoryService _CategoryService; //TODO: lägg till alla services

        public CategoryController(CategoryService categoryService) => _CategoryService = categoryService;

        [HttpGet]
        public async Task<ActionResult<List<Category>>> Get()
        {
            var categories = await _CategoryService.GetAsync();
            if (categories == null)
                return NotFound();
            return Ok(categories);
        }

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Book book) { }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> AddToBooks(string id, [FromBody] string bookId) { }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(string id) { }
    };
}