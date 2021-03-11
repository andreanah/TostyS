﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class Format
    {
        public int Id { get; set; }
        public string TypeCode { get; set; }
        public string Type { get; set; }

        public virtual ICollection<ProductFormat> ProductFormat { get; set; }
    }
}
