using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class CreditCard
    {
        public int Id { get; set; }
        public DateTime DateBirth { get; set; }
        public string CreditCardNumber { get; set; }

        public string IdUser { get; set; }
        
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
