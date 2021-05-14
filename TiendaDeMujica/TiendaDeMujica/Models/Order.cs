using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Order
    {
        public int Id { get; set; }
        public float Total { get; set; }
        public string Status { get; set; }
        public bool Active { get; set; }

        public int IdAddress { get; set; }
        public string IdUser { get; set; }

        [JsonIgnore]
        public virtual Address Address { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderProduct> OrderProduct { get; set; }

        //order
    }
}
