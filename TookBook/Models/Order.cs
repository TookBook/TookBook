namespace TookBook.Models
{
    using MongoDB.Bson.Serialization.Attributes;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;

    public class Order : IOrder
    {
        
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string OrderId { get; set; } = "";
        public string Date { get; set; } = "";
        public IEnumerable<Book> Books { get; set; } = new List<Book>();
    }
}
