using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models.Models
{
    public class Filter
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string SquareFrom { get; set; } = string.Empty;

        public string SquareTo { get; set; } = string.Empty;

        public string PriceFrom { get; set; } = string.Empty;

        public string PriceTo { get; set; } = string.Empty;

        public int Page { get; set; }

    }
}
