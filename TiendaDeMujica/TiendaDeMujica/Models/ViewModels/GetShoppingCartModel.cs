using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models.ViewModels
{
    public class GetShoppingCartModel
    {
        public string IdUser { get; set; }
        public string UserName { get; set; }

        public List<ProductCartModel> ShoppingCart { get; set; }

    }

    public class ProductCartModel
    {
        public int IdShoppingCart { get; set; }
        public int Quantity{ get; set; }
        public Product Product { get; set; }
    }
}
