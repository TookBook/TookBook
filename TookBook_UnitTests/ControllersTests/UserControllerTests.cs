using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
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
    public class UserControllerTests
    {
        private UserController _userController;
        private Mock<IUserService> _userService;

        [SetUp]
        public void SetUp()
        {
            _userService = new Mock<IUserService>();
            _userController = new UserController(_userService.Object);
        }

        [Test]
        public async Task GetAllUsers_UserIsNotNull_ReturnOkResult()
        {
            var users = new List<User>
                {
                    new User { UserId = "1", UserName= "Anderss"},
                    new User { UserId = "2", UserName= "Jolly"},
                    new User { UserId = "3", UserName= "Jhon"},

                };

            _userService.Setup(u => u.GetAsync().Result).Returns(users);
            var result = await _userController.Get();

            //Assert
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task GetAllUsers_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(u => u.GetAsync().Result).Returns(() => null);
            var result = await _userController.Get();
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }

        [Test]
        public async Task GetLogIn_UserIsNotNull_ReturnOkResult()
        {
            var users = new List<User>
                {
                    new User { UserId = "1", UserName= "Anderss", Password = "AA11"},
                    new User { UserId = "2", UserName= "Jolly", Password = "JJ22"},
                    new User { UserId = "3", UserName= "Jhon", Password = "HH33"},

                };
            var user = users.Find(x => x.UserName == "Anderss" && x.Password == "AA11");
            _userService.Setup(u => u.LoginAsync("Anderss", "AA11").Result).Returns(user);
            var result = await _userController.Get("Anderss", "AA11");

            //Assert
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task GetLogIn_UserIsNull_ReturnNotFound()
        {
            /// UserName "Samy" and Password "ss88" 
            /// The user is not exist so is its null
            /// The methoe return Not Found
            _userService.Setup(u => u.LoginAsync("Samy", "ss88").Result).Returns(() => null);
            var result = await _userController.Get("Samy", "ss88");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result

        }

        [Test]
        public async Task ᚠᚬᚱᚴᚬᛏᛒᛅᛋᛋᚢᚢᚱᚦ_UserIsNotNull_ReturnOkResult()
        {
            var users = new List<User>
                {
                    new User { UserId = "1", UserName= "Anderss", Password = "AA11", Mail = "aaa@mail.com"},
                    new User { UserId = "2", UserName= "Jolly", Password = "JJ22", Mail = "jjj@mail.com"},
                    new User { UserId = "3", UserName= "Jhon", Password = "HH33", Mail = "hhh@mail.com"},

                };
            var user = users.Find(x => x.Mail == "aaa@mail.com");
            _userService.Setup(u => u.ForgotPasswordAsync("aaa@mail.com").Result).Returns(user);
            var result = await _userController.ᚠᚬᚱᚴᚬᛏᛒᛅᛋᛋᚢᚢᚱᚦ("aaa@mail.com");
            
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task ᚠᚬᚱᚴᚬᛏᛒᛅᛋᛋᚢᚢᚱᚦ_UserIsNull_ReturnNotFound()
        {
            /// Email is ddd@mail.com
            /// The user is not exist so its is null
            /// The methoe return Not Found
            _userService.Setup(u => u.ForgotPasswordAsync("ddd@mail.com").Result).Returns(() => null);
            var result = await _userController.ᚠᚬᚱᚴᚬᛏᛒᛅᛋᛋᚢᚢᚱᚦ("ddd@mail.com");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result

        }

        [Test]
        public async Task ForgorUsername_UserIsNotNull_ReturnOkResult()
        {
            var users = new List<User>
                {
                    new User { UserId = "1", UserName= "Anderss", Password = "AA11", Mail = "aaa@mail.com"},
                    new User { UserId = "2", UserName= "Jolly", Password = "JJ22", Mail = "jjj@mail.com"},
                    new User { UserId = "3", UserName= "Jhon", Password = "HH33", Mail = "hhh@mail.com"},

                };
            var user = users.Find(x => x.Mail == "aaa@mail.com");
            _userService.Setup(u => u.ForgotPasswordAsync("aaa@mail.com").Result).Returns(user);
            var result = await _userController.ForgorUsername("aaa@mail.com");

            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task ForgorUsername_UserIsNull_ReturnNotFound()
        {
            /// Email is ddd@mail.com
            /// The user is not exist so its is null
            /// The methoe return Not Found
            _userService.Setup(u => u.ForgotPasswordAsync("ddd@mail.com").Result).Returns(() => null);
            var result = await _userController.ForgorUsername("ddd@mail.com");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result

        }

        [Test]
        public async Task BlockUser_UserIsNotNull_ReturnOkResult()
        {
            var user = new User() { UserId = "2" };
            _userService.Setup(b => b.GetUserById("2").Result).Returns(user);
            //return user -------> exist user
            var result = await _userController.BlockUser("2");

            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task BlockUser_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("2").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.BlockUser("2");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }

        [Test]
        public async Task UnblockUser_UserIsNotNull_ReturnOkResult()
        {
            var user = new User() { UserId = "100" };
            _userService.Setup(b => b.GetUserById("100").Result).Returns(user);
            //return user -------> exist user
            var result = await _userController.UnblockUser("100");

            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task UnblockUser_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("100").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.UnblockUser("100");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }


        [Test]
        public async Task ChangeUserPassword_UserIsNotNull_ReturnOkResult()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var result = await _userController.ChangeUserPassword("12", "SS13");

            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task ChangeUserPassword_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("12").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.ChangeUserPassword("12", "SS13");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }


        [Test]
        public async Task PromoteUser_UserIsNotNullAndPromoted_ReturnOkResult()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.Promote(user).Result).Returns(true);
            //True ------>  prompted user
            var result = await _userController.PromoteUser("12");
            
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task PromoteUser_UserIsNotNullButNotPromoted_ReturnBadRequest()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.Promote(user).Result).Returns(false);
            //False ------>  user is not prompted
            var result = await _userController.PromoteUser("12");

            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task PromoteUser_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("12").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.PromoteUser("12");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }

        [Test]
        public async Task DemoteUser_UserIsNotNullAndPromoted_ReturnOkResult()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.Demote(user).Result).Returns(true);
            //True ------>  prompted user
            var result = await _userController.DemoteUser("12");

            Assert.That(result, Is.TypeOf<OkResult>());
            //Return -----> Ok Result
        }

        [Test]
        public async Task DemoteUser_UsersIsNotNullButNotPromoted_ReturnBadRequest()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.Demote(user).Result).Returns(false);
            //False ------>  user is not prompted
            var result = await _userController.DemoteUser("12");

            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            //Return -----> Bad Request
        }

        [Test]
        public async Task DemoteUser_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("12").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.DemoteUser("12");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }

        [Test]
        public async Task InactivateUser_UserIsNotNullAndPromoted_ReturnOkResult()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.InactivateUser(user).Result).Returns(true);
            //True ------>  prompted user
            var result = await _userController.InactivateUser("12");

            Assert.That(result, Is.TypeOf<OkResult>());
            //Return -----> Ok Result
        }

        [Test]
        public async Task InactivateUser_UsersIsNotNullButNotPromoted_ReturnBadRequest()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.InactivateUser(user).Result).Returns(false);
            //False ------>  user is not prompted
            var result = await _userController.InactivateUser("12");

            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            //Return -----> Bad Request
        }

        [Test]
        public async Task InactivateUser_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("12").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.InactivateUser("12");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }

        [Test]
        public async Task InactivateSeller_UserIsNotNullAndPromoted_ReturnOkResult()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.InactivateSeller(user).Result).Returns(true);
            //True ------>  prompted user
            var result = await _userController.InactivateSeller("12");

            Assert.That(result, Is.TypeOf<OkResult>());
            //Return -----> Ok Result
        }

        [Test]
        public async Task InactivateSeller_UsersIsNotNullButNotPromoted_ReturnBadRequest()
        {
            var user = new User() { UserId = "12" };
            _userService.Setup(b => b.GetUserById("12").Result).Returns(user);
            //return user -------> exist user
            var notPromt = _userService.Setup(x => x.InactivateSeller(user).Result).Returns(false);
            //False ------>  user is not prompted
            var result = await _userController.InactivateSeller("12");

            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
            //Return -----> Bad Request
        }

        [Test]
        public async Task InactivateSeller_UserIsNull_ReturnNotFound()
        {
            _userService.Setup(b => b.GetUserById("12").Result).Returns(() => null);
            //Null -----> user is not exist
            var result = await _userController.InactivateSeller("12");

            Assert.That(result, Is.TypeOf<NotFoundResult>());
            //Return ----> user not found result
        }



    }
}
