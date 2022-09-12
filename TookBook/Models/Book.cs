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

      
        public string Title { get; set; } = "";
        
      
        public string Category { get; set; } = "";
        
        
        public string Language { get; set; } = "";
        
      
        public string[]? Authors { get; set; }
        
        
        public int Year { get; set; }
        
       
        public int[]? InStock { get; set; }
        
      
        public decimal Price { get; set; }
        
       
        public string Seller { get; set; } = "";
        
       
        public string BookInfo { get; set; } = "";
    }
}
