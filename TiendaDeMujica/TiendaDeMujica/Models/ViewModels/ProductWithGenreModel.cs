using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace TiendaDeMujica.Models.ViewModels
{
    [NotMapped]
    public class ProductWithGenreModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string? Description { get; set; }
        public string URLImage { get; set; }
        public bool Active { get; set; }
        public string GenreName { get; set; }
        public int IdGenre { get; set; }
    }
}
