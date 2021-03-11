using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Product
    {
        public int Id{ get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string? Description { get; set; }
        public bool Active { get; set; }

        public int IdGenre { get; set; }

        public virtual ICollection<ShoppingCart> ShoppingCart { get; set; }
        public virtual ICollection<OrderProduct> OrderProduct { get; set; }
        public virtual ICollection<ArtistProduct> ArtistProduct { get; set; }
        public virtual ICollection<ProductFormat> ProductFormat { get; set; }
        public virtual ICollection<Photos> Photos { get; set; }

        public virtual Genre Genre { get; set; }
    }
}
