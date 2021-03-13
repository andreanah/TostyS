using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Photos
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public byte[] Image { get; set; }

        public virtual Product Product { get; set; }
    }
}
