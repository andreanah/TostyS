using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
