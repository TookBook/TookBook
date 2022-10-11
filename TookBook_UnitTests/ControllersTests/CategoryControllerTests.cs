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
    public class CategoryControllerTests
    {
        private CategoryController _categoryController;
        private Mock<ICategoryService> _categoryService;

        [SetUp]
        public void SetUp()
        {
            _categoryService = new Mock<ICategoryService>();
            _categoryController = new CategoryController(_categoryService.Object);
        }

        [Test]
        public async Task GetAllCategories_CategoriesAreNotNull_ReturnOkResult()
        {
            var categories = new List<Category>
                {
                    new Category { Id = "1", CategoryName = "ABC"},
                    new Category { Id = "2", CategoryName = "DEF"},
                    new Category { Id = "3", CategoryName = "GHI"}
                };

            _categoryService.Setup(c => c.GetAsync().Result).Returns(categories);
            var result = await _categoryController.Get();
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task GetAllCategories_CategoriesAreNull_ReturnNotFound()
        {
            _categoryService.Setup(c => c.GetAsync().Result).Returns(() => null);
            //null ----> category is not exist
            var result = await _categoryController.Get();
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
            //Return ----> category not found result
        }

        [Test]
        public async Task GetFiltered_CategoriesAreNotNull_ReturnOkResult()
        {
            var categories = new List<Category>
                {
                    new Category { Id = "1", CategoryName = "ABC"},
                    new Category { Id = "2", CategoryName = "DEF"},
                    new Category { Id = "3", CategoryName = "ABC"}
                };

            _categoryService.Setup(c => c.GetFilteredAsync("ABC").Result).Returns(categories);
            var result = await _categoryController.GetFiltered("ABC");
            Assert.That(result.Result, Is.TypeOf<OkObjectResult>());
        }

        [Test]
        public async Task GetFiltered_CategoriesAreNull_ReturnNotFound()
        {
            _categoryService.Setup(c => c.GetFilteredAsync("TGk").Result).Returns(() => null);
            //null ----> category is not exist
            var result = await _categoryController.GetFiltered("TGK");
            Assert.That(result.Result, Is.TypeOf<NotFoundResult>());
            //Return ----> category not found result
        }

        [Test]
        public async Task CreateCategory_CategoryIsNotExists_ReturnOkResult()
        {
            var category = new Category();
            _categoryService.Setup(c => c.GetCategoryByName(category.CategoryName).Result).Returns(() => null);
            //null ----> category is not exist

            var result = await _categoryController.CreateCategory(category);
            //result -----> Ok result
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task CreateCategory_CategoryIsNotNullAndNotExists_ReturnBadRequest()
        {
           
            var category = new Category() { Id = "3", CategoryName = "ABC" };
            _categoryService.Setup(c => c.GetCategoryByName("ABC").Result).Returns(category);
            //null ----> category is exist
            var result = await _categoryController.CreateCategory(category);
            //result -----> bad request
            Assert.That(result, Is.TypeOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task UpdateCategory_CategoryIsExists_ReturnOkResult()
        {
            var category = new Category() { Id = "3", CategoryName = "GGG" };

            var getCategory = _categoryService.Setup(c => c.GetCategoryById("3").Result).Returns(category);
            //null ----> category is exist
            var result = await _categoryController.UpdateCategory("3", "GGG");
            //result -----> ok result
            Assert.That(result, Is.TypeOf<OkResult>());
        }

        [Test]
        public async Task UpdateCategory_CategoryIsNotExists_ReturnBadRequest()
        {
            var category = new Category();
            _categoryService.Setup(c => c.GetCategoryById("5").Result).Returns(() => null);
            //null ----> category is not exist
            var result = await _categoryController.UpdateCategory("5", "GGG");
            //result -----> not found result
            Assert.That(result, Is.TypeOf<NotFoundResult>());
        }

        


    }
}
