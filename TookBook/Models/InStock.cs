namespace TookBook.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Interfaces;

    public class InStock : IInStock
    {
        public int New { get; set; }
        public int Used { get; set; }
    }
}
