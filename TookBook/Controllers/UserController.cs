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

        public UserController(UserService userService) => _userService = userService;

        //Tested in swagger /Max
        [HttpGet("AllUsers")]
        public async Task<ActionResult<List<User>>> Get()
        {
            var users = await _userService.GetAsync();
            if (users == null)
                return NotFound();
            return Ok(users);
        }

        //Tested in swagger /Max
        [HttpGet("Login")]
        public async Task<ActionResult<User>> Get(string username, string password)
        {
            var user = await _userService.LoginAsync(username, password);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //Tested in swagger /Max
        [HttpGet("ForgotPassword")]
        public async Task<ActionResult<User>> ᚠᚬᚱᚴᚬᛏᛒᛅᛋᛋᚢᚢᚱᚦ(string userOrMail) //Send whole user or just mail? Think mail is more secure
        {
            var user = await _userService.ForgotPasswordAsync(userOrMail);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.Mail);
        }

        //Tested in swagger /Max
        [HttpGet("ForgotUsername")]
        public async Task<ActionResult<User>> ForgorUsername(string mail)  //Send whole user or just mail? Think mail is more secure
        {
            var user = await _userService.ForgotPasswordAsync(mail);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.Mail + " " + user.UserName);
        }
    };
}