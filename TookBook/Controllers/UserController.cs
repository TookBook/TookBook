﻿namespace TookBook.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using TookBook.Models;
    using TookBook.Services;

    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private readonly UserService _userService; //TODO: lägg till alla services

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("AllUsers")]
        public async Task<ActionResult<List<User>>> Get()
        {
            var users = await _userService.GetAsync();
            if (users == null)
                return NotFound();
            return Ok(users);
        }

        //Testat med Swagger /Tiia
        //TODO:fundera hur man kan skicka aktiveringskod (frontend?)
        //TODO: skapas id?
        /// <summary>
        /// Gets a user by username and email. If user doesn't excist, creates user and sends a mail to user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpGet("RegisterUser")]
        public async Task<ActionResult<User>> RegisterUser(string username, string email)
        {
            var user = await _userService.RegisterUserAsync(username, email);
            if (user == null)
            {
                user = new User { UserName = username, Mail = email };
                return Ok(user.Mail);
            }
            return NotFound();
        }

        //TODO lite osäker med att den returnerar en hel json-objekt
        [HttpPost("EditProfile")]
        public async Task<ActionResult> EditProfile(string id, string username, string email, string password)
        {
            var user = await _userService.GetUserById(id);
            if (user.Password == password) //vi kan kontrollera att användaren skriver in rätt lösenord för att kunna ändra profilen
            {
                user.UserName = username;
                user.Mail = email;
                await _userService.EditProfileAsync(user.UserId, user);
                return Ok(user);
            }

            return NotFound(); //eventuellt returnera en annan statuskod?

        }

        //Testat med Swagger /Tiia
        /// <summary>
        /// Gets a user by username or email. If user excists, returns user
        /// </summary>
        /// <param name="userIdentifier"></param>
        /// <returns></returns>
        [HttpGet("ShowProfile")]
        public async Task<ActionResult<User>> ShowProfile(string userIdentifier)
        {
            var user = await _userService.ShowProfileAsync(userIdentifier);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        ////funkar inte i swagger
        //[HttpGet("ChangePassword")]
        //public async Task<ActionResult<User>> ChangePassword(User user, string newPassword, string confirmPassword)
        //{
        //    if (user.IsActive) //vet inte om detta behövs här
        //    {
        //        user = await _userService.ChangePasswordAsync(user, newPassword, confirmPassword);
        //        if (newPassword != confirmPassword) //om lösenorden inte stämmer överens
        //            return NotFound();
        //        return Ok(user.Password);
        //    }
        //    return NotFound();
        //}


        //TODO lägg till activation code
        //[HttpGet("ActivateUser")]
        //public async Task ActivateAccount(User accountToActivate)
        //{
        //    if (accountToActivate == null)
        //    await _userService.ActivateAccountAsync(accountToActivate);
        //}

        ////ActivateSeller
        //public async Task<ActionResult<UserType>> ActivateSeller(string id)
        //{
        //    await
        //}



        /// <summary>
        /// Returns Ok if user is found and returns users as JSON file
        /// </summary>
        /// <returns></returns>
        [HttpGet("ListUsers")]
        public async Task<ActionResult<List<User>>> ListUsers()
        {
            var users = await _userService.ListUsersAsync();
            if (users == null)
                return NotFound();
            return Ok(users);
        }
    }

}
