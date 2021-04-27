using Microsoft.EntityFrameworkCore;
using Models.Models;
using System;

namespace DBRepository
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<User> Users{ get; set; }

        public DbSet<ApartmentDemand> ApartmentDemands { get; set; }

        public DbSet<ApartmentOffer> ApartmentOffers { get; set; }
    }
}
