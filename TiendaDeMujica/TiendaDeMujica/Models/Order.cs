using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Order
    {
        public int Id { get; set; }

        public decimal Total { get; set; }

        public string Status { get; set; }

        public virtual Address IdAddress { get; set; }

        public virtual User Username { get; set; }

       //order
    }
}
