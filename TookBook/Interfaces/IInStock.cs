namespace TookBook.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IInStock
    {
        public int @New { get; set; }
        public int Used { get; set; }
    }
}
