
namespace TookBook.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using TookBook.Services;
    using TookBook.Models;

    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService; //TODO: lägg till alla services
        public BookController(BookService bookService) => _bookService = bookService;

        //Tested in swagger /Max
        [HttpGet("AllBooks")]
        public async Task<ActionResult<List<Book>>> Get() {
            var books = await _bookService.GetAsync();
            if (books == null)
                return NotFound();
            return Ok(books);
        }

        //Tested in swagger /Max
        [HttpGet("FilteredBooks")]
        public async Task<ActionResult<List<Book>>> GetFiltered(string keyword)
        {
            var books = await _bookService.GetFilteredAsync(keyword);
            if (books == null)
                return NotFound();
            return Ok(books);
        }

        //Tested in swagger and does not work /Max
        [HttpGet("BooksInCategory")]
        public async Task<ActionResult<List<Book>>> GetBooksInCategory(Category category)
        {
            var books = await _bookService.GetBooksInCategoryAsync(category);
            if (books == null)
                return NotFound();
            return Ok(books);
        }

        //Tested in swagger and does not work /Max
        [HttpGet("BooksByAuthor")]
        public async Task<ActionResult<List<Book>>> GetBooksByAuthor(string author)
        {
            var books = await _bookService.GetBooksByAuthorAsync(author);
            if (books == null)
                return NotFound();
            return Ok(books);
        }

        //THIS ONE CRASHES PROGRAM AT THE MOMENT, DO NOT REMOVE OR UNCOMMENT
        /*
        [HttpGet("BuyBook")]
        public async Task<ActionResult<List<Book>>> BuyBook(Book book, User user, bool used)
        {
            var books = await _bookService.BuyBookAsync(book, user, used);
            if (!books)
                return NotFound();
            return Ok();
        }
        */


        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Book book) { }        
        //[HttpPut("{id}")]
        //public async Task<IActionResult> AddToBooks(string id, [FromBody] string bookId) { }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(string id) { }
    };
}