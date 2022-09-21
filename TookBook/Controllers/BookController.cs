
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

        //TODO behöver hjälp med denna
        //[HttpGet("AddBook")]
        //public async Task<ActionResult> AddToBooks(Book bookToAdd)
        //{
        //    //om alla parametrar är korrekta
        //    //öka antalet böcker i databasen
        //    //annars skapa en bok med alla parametrar
        //    if (bookToAdd != )
        //        return new Book { 
        //            Title = "Title", 
        //            Categories = new List<Category>(), 
        //            Language = "Language", 
        //            Authors = new List<Author>(), 
        //            Year = 2021, 
        //            InStock = new InStock , 
        //            Price = 1, 
        //            Seller = "Seller", 
        //            BookInfo = "BookInfo" };
        //}
        

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
