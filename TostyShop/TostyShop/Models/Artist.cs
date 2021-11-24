﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Artist
    {
        public int Id { get; set; }
        public string StageName { get; set; }
        public string RealName { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<ArtistProduct> ArtistProduct { get; set; }
    }
}

