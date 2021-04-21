using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Address> Address { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<ShoppingCart> ShoppingCart { get; set; }
        public virtual ICollection<CreditCard> CreditCard { get; set; }
    }
}
