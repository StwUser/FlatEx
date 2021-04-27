using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository
{
    public class DbInitializer
    {
        public static void Initialize(RepositoryContext context)
        {
            if (!context.Users.Any())
            {
                var user = new User() { Name = "Admin", Surname = "Admin", Email = "AdminEmail"};

                context.Users.Add(user);

                context.ApartmentOffers.AddRange(
                    new ApartmentOffer() { Title = "title1", Content = "content1", Address = "address1", Price = 1, Square = 1,User = user });

                context.ApartmentDemands.AddRange(
                    new ApartmentDemand() { Title = "title1", Content = "content1", PreferAddress = "address1", PriceCap = 1, Square = 1, User = user });

                context.SaveChanges();
            }
        }
    }
}
