using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class CreditCard
    {
        public int Id { get; set; }
        public DateTime DateBirth { get; set; }
        public string CreditCardNumber { get; set; }

        public virtual User User { get; set; }
    }
}
