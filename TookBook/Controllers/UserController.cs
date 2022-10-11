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
        private readonly IUserService _userService; //TODO: lägg till alla services

        public UserController(IUserService userService = null, UserService userService1 = null)
        {
            _userService = userService1 ?? userService;
        }

        //Tested in swagger /Max
        [HttpGet("AllUsers")]
        public async Task<ActionResult<List<User>>> Get()
        {
            var users = await _userService.GetAsync();
            if (users == null)
                return NotFound();
            return Ok(users);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> GetUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
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

        /// <summary>
        /// Gets a user by username and email. If user doesn't excist, creates user and sends a mail to user
        /// </summary>
        /// <param name="username"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost("RegisterUser")]
        public async Task<ActionResult<User>> RegisterUser(string username, string email)
        {
            var user = await _userService.RegisterUserAsync(username, email);
            if (user == null)
            {
                user = new User { UserName = username, Mail = email };
                return Ok(user.Mail);
            }
            return Ok(user);
        }


        /// <summary>
        /// Updates a users profile-info.
        /// </summary>
        /// <param name="id">The ID of the user</param>
        /// <param name="username">The username.</param>
        /// <param name="email">The email.</param>
        /// <param name="oldPassword">The old password.</param>
        /// <param name="newPassword">The new password.</param>
        /// <returns>A 200-response along with the updated user, if user was found. Error 500 if password did not match. Error 404 Not Found if user was not found </returns>
        [HttpPost("EditProfile")]
        public async Task<ActionResult> EditProfile(string id, string username, string email, string oldPassword, string newPassword)
        {
            var user = await _userService.GetUserById(id);
            if (user != null)
            {
                if (user.Password == oldPassword) //vi kan kontrollera att användaren skriver in rätt lösenord för att kunna ändra profilen
                {
                    user.UserName = username;
                    user.Mail = email;
                    user.Password = newPassword;
                    await _userService.EditProfileAsync(user.UserId, user);
                    return Ok(user);
                }
                return BadRequest("Password did not match");
            }
            return NotFound("Could not find user");
        }

        /// <summary>
        /// Blocks the user.
        /// </summary>
        /// <param name="id">The id of the user to be blocked.</param>
        /// <returns></returns>
        // TODO: Admin validation.
        [HttpPut("BlockUser/{id:length(24)}")]
        public async Task<ActionResult> BlockUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            await _userService.BlockUser(user);
            return Ok();
        }

        //Testat med Swagger /Tiia
        /// <summary>
        /// Unblocks the user.
        /// </summary>
        /// <param name="id">The id of the user to be unblocked.</param>
        /// <returns></returns>
        // TODO: Admin validation.
        [HttpPut("UnblockUser/{id:length(24)}")]
        public async Task<ActionResult> UnblockUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            await _userService.UnblockUser(user);
            return Ok();
        }

        /// <summary>
        /// Updates a user with a new password.
        /// </summary>
        /// <param name="id">ID of the user to update.</param>
        /// <param name="newPassword">The new password.</param>
        /// <returns></returns>
        // TODO: Admin + password verification.
        [HttpPut("ChangePass/{id:length(24)}")]
        public async Task<ActionResult> ChangeUserPassword(string id, string newPassword)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            await _userService.ChangeUserPass(user, newPassword);
            return Ok();
        }


        // TODO: Admin validation.
        [HttpPut("PromoteUser/{id:length(24)}")]
        public async Task<ActionResult> PromoteUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            var userPromoted = await _userService.Promote(user);
            if (!userPromoted) return BadRequest("User appears to be an admin already.");
            return Ok();

        }

        // TODO: Admin validation.
        [HttpPut("DemoteUser/{id:length(24)}")]
        public async Task<ActionResult> DemoteUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            var userPromoted = await _userService.Demote(user);
            if (!userPromoted) return BadRequest("User is not an admin.");
            return Ok();

        }

        // TODO: Admin validation.
        [HttpPut("InactivateUser/{id:length(24)}")]
        public async Task<ActionResult> InactivateUser(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            var userPromoted = await _userService.InactivateUser(user);
            if (!userPromoted) return BadRequest("User is inactive.");
            return Ok();

        }

        // TODO: Admin validation.
        [HttpPut("InactivateSeller/{id:length(24)}")]
        public async Task<ActionResult> InactivateSeller(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null) return NotFound();
            var userPromoted = await _userService.InactivateSeller(user);
            if (!userPromoted) return BadRequest("User is not a seller.");
            return Ok();

        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult> CreateUser(string name, string email, string password)
        {
            var userAlreadyExists = await _userService.GetUserByName(name);
            if (userAlreadyExists != null) return BadRequest("A user with that username already exists");
            var createdUser = await _userService.AddUserAsync(name, email, password);
            return Ok(createdUser);

        }


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
    };
}