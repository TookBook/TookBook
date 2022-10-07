using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Constraints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TookBook.Controllers;
using TookBook.Interfaces;
using TookBook.Models;
using TookBook.Services;



namespace TookBook_UnitTests.ControllersTests
{
    [TestFixture]
    public class BookControllerTests
    {
        private BookController _bookController;
        private Mock<IBookService> _bookService;
       
        [SetUp]
        public void SetUp()
        {
            _bookService = new Mock<IBookService>();
            _bookController = new BookController(_bookService.Object);
        }

        [Test]
        public async Task Get_BooksNotNull_ReturnOkResult()
        {
            var books = new List<Book>
                {
                    new Book { BookId= "1", Title="ABC"},
                    new Book { BookId= "2", Title="DEF"},
                    new Book { BookId= "3", Title="IGK"},
                };
            
            _bookService.Setup(b => b.GetAsync().Result).Returns(books);
            var result = await _bookController.Get();

            //Assert
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
            //Return ----> Ok Object Result for all books

        }

        [Test]
        public async Task Get_BooksAreNull_ReturnNotFound()
        { 
            _bookService.Setup(x => x.GetAsync().Result).Returns(() => null); 
            var result = await  _bookController.Get();
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task GetFiltered_BooksNotNull_ReturnOkResult()
        {
            var books = new List<Book>
                {
                    new Book { BookId= "1", Title="ABC"},
                    new Book { BookId= "2", Title="DEF"},
                    new Book { BookId= "3", Title="ABC"},
                };

            _bookService.Setup(b => b.GetFilteredAsync("ABC").Result).Returns(books);
            var result = await _bookController.GetFiltered("ABC");

            //Assert
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());


        }

        [Test]
        public async Task GetFiltered_BooksAreNull_ReturnExeptionNotFound()
        {
            _bookService.Setup(x => x.GetFilteredAsync("AAA").Result).Returns(() => null);
            var result = await _bookController.GetFiltered("AAA");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task GetBooksInCategory_BooksNotNull_ReturnOkResult()
        {
            var books = new List<Book>
                {
                    new Book { BookId= "1", Title="ABC"},
                    new Book { BookId= "2", Title="DEF"},
                    new Book { BookId= "3", Title="ABC"},
                };

            _bookService.Setup(b => b.GetBooksInCategoryAsync("ABC").Result).Returns(books);
            var result = await _bookController.GetBooksInCategory("ABC");

            
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());


        }

        [Test]
        public async Task GetBooksInCategory_BooksAreNull_ReturnExeptionNotFound()
        {
            _bookService.Setup(x => x.GetBooksInCategoryAsync("AAA").Result).Returns(() => null);
            var result = await _bookController.GetBooksInCategory("AAA");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task GetBooksByAuthor_BooksNotNull_ReturnOkResult()
        {
            var books = new List<Book>
                {
                    new Book { BookId= "1", Title="ABC"},
                    new Book { BookId= "2", Title="DEF"}, 
                    new Book { BookId= "3", Title="ABC"},
                };

            _bookService.Setup(b => b.GetBooksByAuthorAsync("ABC").Result).Returns(books);
            var result = await _bookController.GetBooksByAuthor("ABC");

            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task GetBooksByAuthor_BooksAreNull_ReturnExeptionNotFound()
        {
            _bookService.Setup(x => x.GetBooksByAuthorAsync("AAA").Result).Returns(() => null);
            var result = await _bookController.GetBooksByAuthor("AAA");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task BuyBook_BooksNotNull_ReturnOkResult()
        {
            var books = new List<Book>
                {
                    new Book { BookId= "1", Title="ABC", InStock = new InStock { Used = 1 }},
                    new Book { BookId= "2", Title="DEF"},
                    new Book { BookId= "3", Title="ABC"},
                };
            var user = new User() { UserType = new UserType { IsAdmin = false, IsSeller = false }, IsActive = true, IsBlocked = false };
            //user.Orders = new List<Order>() { new Order { Books = books } };
            var book =  books.Find(x => x.BookId == "1");
            _bookService.Setup(x => x.GetBookById("1").Result).Returns(book);
            _bookService.Setup(b => b.BuyBookAsync(book, true).Result).Returns(true);
            var result = await _bookController.BuyBook("1", user, true);
            Assert.That(result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task BuyBook_BookIsNull_ReturnNotFound()
        {  
            var book = new Book();
            var user = new User();
            _bookService.Setup(x => x.GetBookById("1").Result).Returns(() => null);
            var result = await _bookController.BuyBook("1", user, true);
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task BuyBook_WhenUserIsAdminOrSeller_ReturnBadRequest()
        {
            //Seller is true
            var books = new List<Book>
                {
                    new Book { BookId= "1", Title="ABC", InStock = new InStock { Used = 1 }},
                    new Book { BookId= "2", Title="DEF"},
                    new Book { BookId= "3", Title="ABC"},
                };
            var user = new User() { UserType = new UserType { IsAdmin = false, IsSeller = true }, IsActive = true, IsBlocked = false };
            //user.Orders = new List<Order>() { new Order { Books = books } };
            var book = books.Find(x => x.BookId == "1");
            _bookService.Setup(x => x.GetBookById("1").Result).Returns(book);
            var result = await _bookController.BuyBook("1", user, true);
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task AddCategoryToBook_BooksNotNull_ReturnOkResult()
        {
            
            var book = new Book() { BookId = "2" };
            var category = new Category() { CategoryName = "HHH" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(book);
            var result = await _bookController.AddCategoryToBook("2", category);
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task AddCategoryToBook_BookIsNull_ReturnNotFound()
        {
           
            var book = new Book();
            var category = new Category();
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(() => null);
            var result = await _bookController.AddCategoryToBook("2", category);
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task UpdateBook_BooksNotNull_ReturnOkResult()
        {
           
            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(book);
            var result = await _bookController.UpdateBook("2", book);
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task UpdateBook_BookIsNull_ReturnNotFound()
        {

            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(() => null);
            var result = await _bookController.UpdateBook("2", book);
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }


        /// <summary>
        /// other why to test DeleteBook 
        /// </summary>
        /// <returns></returns>

        //[Test]
        //public async Task DeleteBook_WhenCall_DeleteBookFromDatabase()
        //{
        //    //var book = Mock.Of<Book>();
        //    var book = new Book() { BookId = "1" };
        //    var result = _bookController.DeleteBook("1", false);
        //    var exp = _bookService.Setup(b => b.DeleteBook(book, false));
        //}

        [Test]
        public async Task DeleteBook_BooksNotNullAndAbleToDelete_ReturnOkResult()
        {

            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(book);
            var expect = _bookService.Setup(b => b.DeleteBook(book, true).Result).Returns(true);
            var result = await _bookController.DeleteBook("2", true);
            Assert.That(result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task DeleteBook_BooksNotNullAndNotAbleToDelete_ReturnBadReques()
        {

            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(book);
            var expect = _bookService.Setup(b => b.DeleteBook(book, true).Result).Returns(false);
            var result = await _bookController.DeleteBook("2", true);
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task DeleteBook_BooksIsNull_ReturnNotFound()
        {

            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(() => null);
            var result = await _bookController.DeleteBook("2", true);
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        [Test]
        public async Task PurgeBook_BooksNotNull_ReturnOkResult()
        {

            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(book);
            var result = await _bookController.PurgeBook(book.BookId);
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task PurgeBook_BooksIsNull_ReturnNotFound()
        {

            var book = new Book() { BookId = "2" };
            _bookService.Setup(b => b.GetBookById("2").Result).Returns(() => null); ;
            var result = await _bookController.PurgeBook(book.BookId);
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

    }
}
