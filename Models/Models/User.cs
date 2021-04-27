using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public string Email { get; set; }

        public List<ApartmentDemand> ApartmentDemands { get; set; } = new List<ApartmentDemand>();

        public List<ApartmentOffer> ApartmentOffers { get; set; } = new List<ApartmentOffer>();
    }
}
