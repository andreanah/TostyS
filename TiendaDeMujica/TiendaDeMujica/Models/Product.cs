using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
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

        [JsonIgnore]
        public virtual ICollection<ShoppingCart> ShoppingCart { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderProduct> OrderProduct { get; set; }
        [JsonIgnore]
        public virtual ICollection<ArtistProduct> ArtistProduct { get; set; }
        [JsonIgnore]
        public virtual ICollection<ProductFormat> ProductFormat { get; set; }
        [JsonIgnore]
        public virtual ICollection<Photos> Photos { get; set; }

        [JsonIgnore]
        public virtual Genre Genre { get; set; }
    }
}
