using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string CP { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Suburb { get; set; }

        public string IdUser{ get; set; }

        public virtual ICollection<Order> Order { get; set; }

        public virtual User User { get; set; }
    }
}
