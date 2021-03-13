using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class ProductFormat
    {
        public int Id { get; set; }

        public int IdProduct { get; set; }
        public int IdFormat { get; set; }

        public virtual Product Product { get; set; }
        public virtual Format Format { get; set; }
    }
}
