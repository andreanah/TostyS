using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class CreateWithArtistFormatModel
    {
        public Product Product { get; set; }

        public List<int> IdArtists { get; set; }
        public List<int> IdFormats { get; set; }
    }
}
