namespace TookBook.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IUser
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Mail { get; set; }

        public bool[] UserType { get; set; }

        public bool IsActive { get; set; }
        public bool IsBlocked { get; set; }

        public string[] PrevOrders { get; set; }



    }
}
