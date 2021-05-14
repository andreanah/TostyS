using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Format
    {
        public int Id { get; set; }
        public string TypeCode { get; set; }
        public string Type { get; set; }
        public bool Active { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProductFormat> ProductFormat { get; set; }
    }
}
