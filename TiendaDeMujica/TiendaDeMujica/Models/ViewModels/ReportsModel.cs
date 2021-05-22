using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class TopSellingProductModel
    {
        public int IdProduct { get; set; }
        public string ProductName { get; set; }
        public float TotalPrice { get; set; }
        public int Quantity { get; set; }

    }
    [NotMapped]
    public class TopSellingGenreModel
    {
        public int IdGenre { get; set; }
        public string GenreName { get; set; }
        public float TotalPrice { get; set; }
        public int Quantity { get; set; }

    }
    [NotMapped]
    public class TopSellingArtistModel
    {
        public int IdArtist { get; set; }
        public string ArtistName { get; set; }
        public float TotalPrice { get; set; }
        public int Quantity { get; set; }

    }
    [NotMapped]
    public class TopSellingFormatModel
    {
        public int IdFormat { get; set; }
        public string FormatName { get; set; }
        public float TotalPrice { get; set; }
        public int Quantity { get; set; }

    }
}
