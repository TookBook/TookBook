namespace TookBook.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using TookBook.Models;

    public interface IBook
    {
        public string BookId { get; set; }

        public string Title { get; set; }

        public IEnumerable<Category> Categories { get; set; }

        // TODO: Figure out why it doesnt work to use an interface in an interface. It seems counter-intuitive to use a model in an interface, when the interfaces should define the models..?
        //public IEnumerable<ICategory> Categories { get; set; }

        public string Language { get; set; }

        public IEnumerable<Author> Authors  { get; set; }

        public int Year { get; set; }

        public InStock InStock { get; set; }

        public decimal Price { get; set; }

        public string Seller { get; set; }

        public string BookInfo { get; set; }

    }
}
