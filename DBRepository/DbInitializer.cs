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
                var user = new User() { Name = "test", Surname = "test", Email = "test@Email.ua"};

                context.Users.Add(user);

                context.ApartmentOffers.AddRange(
                    
                    new ApartmentOffer() { Title = "For rent", Content = "Rent 1-room apartment", Address = "Minsk, Aerodromnaya st., 32", Price = 300, Square = 50, User = user },
                    new ApartmentOffer() { Title = "For rent", Content = "Rent 2-room apartment", Address = "Minsk, Aerodromnaya st., 64", Price = 500, Square = 60, User = user },
                    new ApartmentOffer() { Title = "For rent", Content = "Rent 4-room apartment", Address = "Minsk, Sedih st., 16", Price = 900, Square = 100, User = user });

                context.ApartmentDemands.AddRange(
                    new ApartmentDemand() { Title = "For demand", Content = "Rent 1-room apartment", PreferAddress = "Nemiga avenue", PriceCap = 450, Square = 50, User = user },
                    new ApartmentDemand() { Title = "For demand", Content = "Rent 2-room apartment", PreferAddress = "Chernyshevsky st.", PriceCap = 300, Square = 70, User = user });

                context.SaveChanges();
            }
        }
    }
}
