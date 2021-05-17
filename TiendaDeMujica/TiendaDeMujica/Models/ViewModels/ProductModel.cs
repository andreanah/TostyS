using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models.ViewModels
{
    public class ProductModel
    {
        public int IdProduct { get; set; }
        public string ProductName { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public List<string> ArtistName { get; set; }
        public List<string> Formats { get; set; }
    }
}
