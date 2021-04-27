using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class ApartmentDemand
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public double Square { get; set; }

        public string PreferAddress { get; set; }

        public decimal PriceCap { get; set; }
    }
}
