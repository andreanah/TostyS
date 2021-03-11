using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class ArtistProduct
    {
        public int Id { get; set; }
        public int IdArtist { get; set; }
        public int IdProduct { get; set; }
        public virtual ICollection<Artist> Artist { get; set; }
        public virtual ICollection<Product> Product { get; set; }

    }
}
