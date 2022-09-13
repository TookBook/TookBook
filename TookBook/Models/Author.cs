namespace TookBook.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;

    public class Author : IAuthor
    {
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
    }
}
