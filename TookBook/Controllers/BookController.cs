
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
        // TODO: Customize api responses?

        private readonly BookService _bookService; //TODO: lägg till alla services
        public BookController(BookService bookService) => _bookService = bookService;

        //Tested in swagger /Max
        [HttpGet("AllBooks")]
        public async Task<ActionResult<List<Book>>> Get()
        {
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
        //[HttpPost("BooksInCategory/{id:length(24)}")]
        public async Task<ActionResult<List<Book>>> GetBooksInCategory(string category)
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


        //TODO: Figure out how filter/update works to update a single field in a collection
        [HttpPut("AddCategory/{id:length(24)}")]
        public async Task<ActionResult> AddBookToCategory(string id, Category category)
        {
            var bookToUpdate = await _bookService.GetBookById(id);
            if (bookToUpdate == null) return NotFound();
            await _bookService.AddBookToCategory(bookToUpdate, category);
            return Ok();
        }

        /// <summary>
        /// Updates a book with the sent in JSON data.
        /// </summary>
        /// <param name="id">The ID of the book to update.</param>
        /// <param name="bookUpdate">The JSON data which will be used to update the book.</param>
        /// <returns></returns>
        // TODO: Admin validation
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> UpdateBook(string id, Book bookUpdate)
        {
            var bookToUpdate = await _bookService.GetBookById(id);
            if (bookToUpdate == null) return NotFound();
            await _bookService.UpdateBook(bookUpdate);
            return Ok();
        }

        /// <summary>
        /// Deletes a book by decreasing the amount currently in stock.
        /// </summary>
        /// <param name="id">The book to be deleted.</param>
        /// <param name="usedBook">Whether the book is used or new. </param>
        /// <returns></returns>
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

        /// <summary>
        /// Deletes a book by removing it from the database.
        /// </summary>
        /// <param name="id">The book to be deleted.</param>
        /// <returns></returns>
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

        /// <summary>
        /// Removes all books from the database where the total inStock count is zero.
        /// </summary>
        /// <returns></returns>
        // TODO: Admin validation
        [HttpDelete("PurgeEmptyBooks")]
        public async Task PurgeBook() => await _bookService.PurgeEmptyBooks();

        
        /// <summary>
        /// Adds a new book to the database.
        /// </summary>
        /// <param name="newBook"></param>
        /// <param name="isNew"></param>
        /// <param name="amount"></param>
        /// <returns></returns>
        [HttpPost("AddBook")]
        public async Task<ActionResult> AddBook(string title, string category, string language, string authorFirstName, string authorLasName, int year, decimal price, string seller, string bookInfo, int amountOfBooks)
        {
            var newBook = await _bookService.AddBookAsyncTest(title, category, language, authorFirstName, authorLasName, year, price, seller, bookInfo, amountOfBooks);
            
            //skapar en ny id
            var newId = ObjectId.GenerateNewId().ToString();

            //sätter id på boken
            

            //kollar om boken redan finns i databasen
            var bookExists = await _bookService.GetByTitle(newBook.Title);
            if (bookExists != null)
            {
                await _bookService.UpdateBook(newBook);
                return BadRequest("Book already exists in database.");   
            }   
            else
            {
                newBook.BookId = newId;
                await _bookService.CreateBookAsync(newBook);
            }
                
            return Ok(newBook);
        }
        //DENNA FUNGERAR PÅ NÅTT SÄTT
        //public async Task<ActionResult> AddBook(string title, int year, decimal price, string seller, int amount)
        //{
        //    var book = await _bookService.GetByTitle(title);
        //    if (book != null)
        //    {
        //        if(book.Seller == "") book.InStock.New+=
        //        book.InStock.New += amount;
        //        await _bookService.UpdateBook(book);
        //        return Ok(book);
        //    }
        //    else
        //    {
        //        var newBook = new Book
        //        {
        //            Title = title,
        //            Year = year,
        //            Price = price,
        //            Seller = seller,
        //            InStock = new InStock
        //            {
        //                New = amount,
        //                Used = 0
        //            }
        //        };
        //        await _bookService.CreateBookAsync(newBook);
        //        return CreatedAtAction(nameof(AddBook), new { id = newBook.BookId }, newBook);
        //    }
        //}
        //public async Task<ActionResult> AddBook(Book newBook)
        //{
        //    var bookExists = await _bookService.GetBookById(newBook.BookId);

        //    if (bookExists != null)
        //    {
        //        if (newBook.Seller != string.Empty) newBook.InStock.Used++;
        //        else newBook.InStock.New++;
        //        return Ok("Book exists already");
        //    }
        //    else
        //    {
        //    await _bookService.CreateBookAsync(newBook);
        //    return Ok(); 
        //    }
        //newBook.BookId = ObjectId.GenerateNewId().ToString(); //löser inte problemet med id
    }

            //[HttpGet("SetAmount")]
            //public async Task<ActionResult> SetAmount(Book bookToBeChanged, int amount)
            //{
            //    var book = await _bookService.GetByIdTest(bookToBeChanged.BookId);
            //    if (book == null)
            //        return NotFound();
            //    await _bookService.SetAmountAsync(bookToBeChanged, amount);
            //    return Ok(bookToBeChanged);
            //}

        
}
