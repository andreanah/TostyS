using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Genre
    {
        public int Id { get; set; }
        public string GenreName { get; set; }
        public bool Active { get; set; }

        [JsonIgnore]
        public virtual ICollection<Product> Product { get; set; }
    }
}
