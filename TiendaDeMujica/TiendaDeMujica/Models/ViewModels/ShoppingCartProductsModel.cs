using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models.ViewModels
{
    public class ShoppingCartProductsModel
    {
        public int IdShoppingCart { get; set; }
        public int IdProduct { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }
    }
}
