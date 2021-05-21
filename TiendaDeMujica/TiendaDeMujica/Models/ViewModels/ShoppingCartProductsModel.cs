using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class ShoppingCartProductsModel
    {
        public int IdShoppingCart { get; set; }
        public int IdProduct { get; set; }
        public int IdFormat { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }
    }
}
