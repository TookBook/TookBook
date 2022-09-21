
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

        // Jespertest
        // Sends a user in JSON form via swagger/frontend in the body of the http request, cant use httpget with a body so httppost is used instead
        [HttpPost("BuyBook/{id:length(24)}")]
        public async Task<ActionResult> BuyBook(string id, User user, bool usedBook)
        {
            var bookToBuy = await _bookService.GetBookById(id);
            if (bookToBuy == null) return NotFound();
            if (user.UserType.IsSeller || user.UserType.IsAdmin) return BadRequest("An admin or seller can't buy a book.");

            var bookIsBuyable = await _bookService.BuyBookAsyncTestTestTest(bookToBuy, usedBook);
            return Ok(bookIsBuyable);
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
            var bookToDelete = await _bookService.GetBookById(id);
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
            var bookToPurge = await _bookService.GetBookById(id);
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