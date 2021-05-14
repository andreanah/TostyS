using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public bool Active { get; set; }

        [JsonIgnore]
        public virtual ICollection<Address> Address { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order> Order { get; set; }
        [JsonIgnore]
        public virtual ICollection<ShoppingCart> ShoppingCart { get; set; }
        [JsonIgnore]
        public virtual ICollection<CreditCard> CreditCard { get; set; }
    }
}
