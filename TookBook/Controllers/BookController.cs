
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
        // TODO: Customize api responses?

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

        [HttpPut("AddCategory/{id:length(24)}")]
        public async Task<ActionResult> AddBookToCategory(string Id, string categoryName)
        {
            // Get book
            // Get category
            // use AddBookToCategoryService
            return NoContent();
        }

        // TODO: Admin validation
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> DeleteBook(string id, bool usedBook)
        {
            // TODO: Use real GetBook method when added.
            var bookToDelete = await _bookService.GetByIdTest(id);
            if (bookToDelete == null) return NotFound();

            var deletedSuccesfully = await _bookService.DeleteBook(bookToDelete, usedBook);
            if (!deletedSuccesfully) return BadRequest(deletedSuccesfully);
            return Ok(deletedSuccesfully);

        }

        // TODO: Admin validation
        [HttpDelete("PurgeBook/{id:length(24)}")]
        public async Task<ActionResult> PurgeBook(string id)
        {
            // TODO: Use GetBook method when added
            var bookToPurge = await _bookService.GetByIdTest(id);
            if (bookToPurge == null) return NotFound();
            await _bookService.PurgeBook(bookToPurge);
            return Ok();
        }

        // TODO: Admin validation
        [HttpDelete("PurgeEmptyBooks")]
        public async Task PurgeBook()
        {
           await _bookService.PurgeEmptyBooks();
        }

        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Book book) { }        
        //[HttpPut("{id}")]
        //public async Task<IActionResult> AddToBooks(string id, [FromBody] string bookId) { }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(string id) { }
    };
}