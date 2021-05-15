using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class ArtistProduct
    {
        public int Id { get; set; }

        public int IdArtist { get; set; }
        public int IdProduct { get; set; }

        [JsonIgnore]
        public virtual Artist Artist { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
    }
}
