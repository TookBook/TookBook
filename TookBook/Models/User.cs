namespace TookBook.Models
{
    using MongoDB.Bson;
    using MongoDB.Bson.Serialization.Attributes;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;
    public class User : IUser
    {

       
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = "";

        [BsonElement("username")]
        public string UserName { get; set; } = "";

        public string Password { get; set; } = "";

        public string Mail { get; set; } = "";

        [BsonElement("usertype")]
        public UserType? UserType { get; set; }

        [BsonElement("isactive")]
        public bool IsActive { get; set; } = false;

        [BsonElement("isblocked")]
        public bool IsBlocked { get; set; } = false;

        public IEnumerable<Order> Orders { get; set; }

    }
}
