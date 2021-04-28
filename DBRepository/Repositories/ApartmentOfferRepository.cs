using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models.Models;

namespace DBRepository.Repositories
{
    public class ApartmentOfferRepository : IRepository<ApartmentOffer>
    {
        private readonly RepositoryContext _context;

        public ApartmentOfferRepository(RepositoryContext context)
        {
            _context = context;
        }

        public void Post(ApartmentOffer entity)
        {
            _context.ApartmentOffers.Add(entity);
            _context.SaveChanges();
        }

        public ApartmentOffer Get(int id)
        {
            return _context.ApartmentOffers.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<ApartmentOffer> GetAll()
        {
            return _context.ApartmentOffers.ToList();
        }

        public IEnumerable<ApartmentOffer> GetFilteredQuery(ApartmentOffer filter)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            var entity = _context.ApartmentOffers.FirstOrDefault(a => a.Id == id);

            if (entity != null)
            {
                _context.ApartmentOffers.Remove(entity);
                _context.SaveChanges();
            }
        }

        public void Put(ApartmentOffer entity)
        {
            var apartment = _context.ApartmentOffers.FirstOrDefault(a => a.Id == entity.Id);

            if (apartment != null)
            {
                _context.ApartmentOffers.Remove(apartment);
                _context.ApartmentOffers.Add(entity);
                _context.SaveChanges();
            }
        }
    }
}
