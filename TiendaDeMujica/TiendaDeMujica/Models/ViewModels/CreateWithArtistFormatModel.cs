using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models.ViewModels
{
    public class CreateWithArtistFormatModel
    {
        public Product Product { get; set; }

        public List<int> IdArtists { get; set; }
        public List<int> IdFormats { get; set; }
    }
}
