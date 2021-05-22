using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class OrderViewModel
    {
        public Order Order { get; set; }
        public Address Address { get; set; }
        public List<OrderProductViewModel> OrderProducts { get; set; }
    }

    [NotMapped]
    public class OrderProductViewModel
    {
        public OrderProduct OrderProduct { get; set; }
        public Format Format { get; set; }
        public Product Product { get; set; }
    }
}
