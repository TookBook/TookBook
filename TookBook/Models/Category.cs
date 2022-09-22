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

    public class Category : ICategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = "";

        [BsonElement("categoryName")]
        public string CategoryName { get; set; } = "";
    }
}