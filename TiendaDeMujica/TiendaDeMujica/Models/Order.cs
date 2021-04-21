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

        public int IdAddress { get; set; }
        public string IdUser { get; set; }

        public virtual Address Address { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<OrderProduct> OrderProduct { get; set; }

        //order
    }
}
