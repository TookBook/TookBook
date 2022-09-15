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
        // TODO: Check so total gets updated correctly. Maybe there's a better way of doing things.

        //private int total;

        //public int Total
        //{
        //    get { return total; }
        //    set { total = New + Used; }
        //}
        public int Total { get; set; }
        public int New { get; set; }
        public int Used { get; set; }


        public InStock()
        {
            Total = New + Used;
        }
    }

}
