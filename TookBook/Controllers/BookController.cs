
namespace TookBook.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using TookBook.Services;
    using TookBook.Models;
    using MongoDB.Bson;

    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService; //TODO: lägg till alla services

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> Get() {
            var books = await _bookService.GetAsync();
            if (books == null)
                return NotFound();
            return Ok(books);
        }

        //TODO: lägg till addbook
        [HttpPost]

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Book book) { }        
        //[HttpPut("{id}")]

        //public async Task<IActionResult> AddToBooks(string id, [FromBody] string bookId) 
        //{
        //    var book = await _bookService.GetAsync(id);
        //    if (book == null)
        //        return NotFound();
        //    await _bookService.AddToBookAsync(id, bookId);
        //    return NoContent();
        //}
        
        
        public async Task<IActionResult> SetAmount(Book book, int amount)
        {
            if (book == null)
                return NotFound();
            return Ok();
        }
            
    }
};
