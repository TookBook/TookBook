
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

        //TODO: får en error
        [HttpGet("AddBook")]
        public async Task<ActionResult> AddToBooks(Book bookToAdd)
        {
            var books = await _bookService.GetAsync();
            var book = books.FirstOrDefault(x => x.BookId == bookToAdd.BookId); //räcker det med id?
            if (book == null)
            {
                await _bookService.AddBook(bookToAdd);
                return Ok(books);
            }
            else
                book.InStock.Total++;
            //update?
            return Ok(book.InStock.Total);

        }

        //doesn't make sense and doesn't work on swagger as it should /Tiia
        [HttpGet("SetAmount")]
        public async Task<ActionResult> SetAmount(Book bookToBeChanged, int amount)
        {
            var book = await _bookService.GetByIdTest(bookToBeChanged.BookId);
            if (book == null)
                return NotFound();
            await _bookService.SetAmountAsync(bookToBeChanged, amount);
            return Ok(bookToBeChanged);
        }
        
            
    }
};
