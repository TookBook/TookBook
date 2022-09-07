namespace TookBook.Models
{
using MongoDB.Bson.Serialization.Attributes;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;
    public class User : IUser
    {

        // TODO: Add correct type?
        [BsonId]
        public string UserId { get; set; } = "";

        public string UserName { get; set; } = "";

        public string Password { get; set; } = "";

        public string Mail { get; set; } = "";

        public bool[]? UserType { get; set; }

        public bool IsActive { get; set; } = false;
        public bool IsBlocked { get; set; } = false;

        public string[]? PrevOrders { get; set; }
    }
}
