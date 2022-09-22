namespace TookBook.Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;

    [BsonIgnoreExtraElements] //Without this the category wont work because they dont have id.
    //If id is added the program can't start ¯\_(ツ)_/¯  probably has to do with bookseed not having id for categories but im too lazy to change and test
    public class Category : ICategory
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        //public string Id { get; set; } = "";

        [BsonElement("categoryName")]
        public string CategoryName { get; set; } = "";
    }
}