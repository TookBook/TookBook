namespace TookBook.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IUserType
    {
        public bool IsAdmin { get; set; }
        public bool IsSeller { get; set; }
    }
}
