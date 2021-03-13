using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }

        public int IdProduct { get; set; }
        public string Username { get; set; }

        public virtual User User { get; set; }
        public virtual User Product { get; set; }
    }
}
