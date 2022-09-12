namespace TookBook.Controllers
{
    using System;
    using Microsoft.AspNetCore.Mvc;
    using TookBook.Services;
    using TookBook.Models;

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService; //TODO: lägg till alla services

        public UserController(BookService bookService)
        {
            _userService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            var user = await _userService.GetAsync();
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<User>> Login()
        { 
            var user = await _userService.LoginAsync();
            user? return Ok(user) : return NotFound();
            
        }
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] Book book) { }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> AddToBooks(string id, [FromBody] string bookId) { }

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(string id) { }
    };
}