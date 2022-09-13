namespace TookBook.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Models;

    public interface IOrder
    {
        public string OrderId { get; set; }
        public string Date { get; set; }
        public IEnumerable<Book> Books { get; set; }
    }
}
