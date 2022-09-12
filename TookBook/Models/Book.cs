namespace TookBook.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;
    using MongoDB.Bson.Serialization.Attributes;
    using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson;

    public class Book : IBook
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        
        public string BookId { get; set; } = "";

        [BsonElement("title")]
        public string Title { get; set; } = "";
        
        [BsonElement("category")]
        public string Category { get; set; } = "";
        
        [BsonElement("language")]
        public string Language { get; set; } = "";
        
        [BsonElement("authors")]
        public string[]? Authors { get; set; }
        
        [BsonElement("year")]
        public int Year { get; set; }
        
        [BsonElement("inStock")]
        public int[]? InStock { get; set; }
        
        [BsonElement("price")]
        public decimal Price { get; set; }
        
        [BsonElement("seller")]
        public string Seller { get; set; } = "";
        
        [BsonElement("bookInfo")]
        public string BookInfo { get; set; } = "";
    }
}
