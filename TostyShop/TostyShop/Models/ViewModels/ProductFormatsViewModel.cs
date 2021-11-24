using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class ProductFormatsViewModel
    {
        public string ProductName { get; set; }
        public List<FormatsViewModel> Formats { get; set; }
    }

    public class FormatsViewModel
    {
        public int IdFormat { get; set; }
        public string TypeCode { get; set; }
        public string Type { get; set; }
    }
}
