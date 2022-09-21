namespace TookBook.Controllers
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

        ////TODO not ready
        //[HttpGet("EditProfile")]
        //public async Task<ActionResult<User>> EditProfile(string username, string email, string password)
        //{
        //    var user = await _userService.EditProfileAsync(username, email, password);
        //    if (user == null)
        //        return NotFound();
        //    return Ok(user);
        //}

        //TODO lite osäker med att den returnerar en hel json-objekt
        [HttpGet("EditProfile")]
        public async Task<ActionResult<User>> EditProfile(User updatedUser)
        {
            var user = await _userService.EditProfileAsync(updatedUser);
            if (user == null)
                return NotFound();
            return Ok(user);
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

        //[HttpGet("ChangePassword")]
        //public async Task<ActionResult<User>> ChangePassword(string newPassword, string confirm)
        //{

        //}


        ////Activationcode
        //public async Task<ActionResult<User>> ActivateAccount()
        //{
        //    return Ok();
        //}

        ////ActivateSeller
        //public async Task<ActionResult<UserType>> ActivateSeller(string id)
        //{
        //    await
        //}



        ///// <summary>
        ///// Returns Ok if user is found, NotFound if user is not found
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet("ListUsers")]
        //public async Task<ActionResult<List<User>>> ListUsers()
        //{
        //    var users = await _userService.ListUsersAsync();
        //    if (users == null)
        //        return NotFound();
        //    return Ok(users);
        //}
    }

}
