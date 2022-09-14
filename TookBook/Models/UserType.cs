namespace TookBook.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;

    public class UserType : IUserType
    {
        public bool IsAdmin { get; set; } = false;
        public bool IsSeller { get; set; } = false;
    }
}
