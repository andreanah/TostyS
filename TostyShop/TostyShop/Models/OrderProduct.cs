﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class OrderProduct
    {
        public int Id { get; set; }

        public int Quantity { get; set; }
        public float TotalPrice { get; set; }
        public float UnitPrice { get; set; }


        public int IdProduct { get; set; }
        public int IdFormat { get; set; }
        public int IdOrder { get; set; }

        [JsonIgnore]
        public virtual Order Order { get; set; }
        [JsonIgnore]
        public virtual Format Format { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
    }
}
