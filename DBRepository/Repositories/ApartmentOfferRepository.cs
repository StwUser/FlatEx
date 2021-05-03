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

        public IEnumerable<ApartmentOffer> GetFiltered(Filter filter)
        {
            var query = _context.ApartmentOffers.AsQueryable();
            if (!string.IsNullOrEmpty(filter.SquareFrom) && filter.SquareFrom.All(char.IsDigit))
                query = query.Where(a => a.Square >= int.Parse(filter.SquareFrom));

            if (!string.IsNullOrEmpty(filter.SquareTo) && filter.SquareTo.All(char.IsDigit))
                query = query.Where(a => a.Square <= int.Parse(filter.SquareTo));

            if (!string.IsNullOrEmpty(filter.PriceFrom) && filter.PriceFrom.All(char.IsDigit))
                query = query.Where(a => a.Price >= int.Parse(filter.PriceFrom));

            if (!string.IsNullOrEmpty(filter.PriceTo) && filter.PriceTo.All(char.IsDigit))
                query = query.Where(a => a.Price <= int.Parse(filter.PriceTo));

            if (filter.Page != 0)
            {
                //paging
                query = query.OrderBy(o => o.Id).Skip(filter.Page * Constants.Values.PageSize - Constants.Values.PageSize).Take(Constants.Values.PageSize);
            }

            return query.ToArray();
        }

        public int GetNumberOfPages()
        {
            return (int)Math.Ceiling((double)_context.ApartmentOffers.Count() / Constants.Values.PageSize);
        }
    }
}
