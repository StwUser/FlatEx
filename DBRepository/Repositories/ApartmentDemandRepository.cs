using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models.Models;

namespace DBRepository.Repositories
{
    public class ApartmentDemandRepository : IRepository<ApartmentDemand>
    {
        private readonly RepositoryContext _context; 
        public ApartmentDemandRepository(RepositoryContext context)
        {
            _context = context;
        }

        public void Post(ApartmentDemand entity)
        {
            _context.ApartmentDemands.Add(entity);
            _context.SaveChanges();
        }

        public ApartmentDemand Get(int id)
        {
            return _context.ApartmentDemands.FirstOrDefault(a => a.Id == id);
        }

        public IEnumerable<ApartmentDemand> GetAll()
        {
            return _context.ApartmentDemands.ToList();
        }

        public void Delete(int id)
        {
            var entity = _context.ApartmentDemands.FirstOrDefault(a => a.Id == id);
            if (entity != null)
            {
                _context.ApartmentDemands.Remove(entity);
                _context.SaveChanges();
            }
        }

        public void Put(ApartmentDemand entity)
        {
            var apartment = _context.ApartmentDemands.FirstOrDefault(a => a.Id == entity.Id);

            if (apartment != null)
            {
                _context.ApartmentDemands.Remove(apartment);
                _context.ApartmentDemands.Add(entity);
                _context.SaveChanges();
            }
        }

        public IEnumerable<ApartmentDemand> GetFiltered(Filter filter)
        {
            var query = _context.ApartmentDemands.AsQueryable();
            if (!string.IsNullOrEmpty(filter.SquareFrom) && filter.SquareFrom.All(char.IsDigit))
                query = query.Where(a => a.Square >= int.Parse(filter.SquareFrom));

            if (!string.IsNullOrEmpty(filter.SquareTo) && filter.SquareTo.All(char.IsDigit))
                query = query.Where(a => a.Square <= int.Parse(filter.SquareTo));

            if (!string.IsNullOrEmpty(filter.PriceFrom) && filter.PriceFrom.All(char.IsDigit))
                query = query.Where(a => a.PriceCap >= int.Parse(filter.PriceFrom));

            if (!string.IsNullOrEmpty(filter.PriceTo) && filter.PriceTo.All(char.IsDigit))
                query = query.Where(a => a.PriceCap <= int.Parse(filter.PriceTo));

            if (filter.Page != 0)
            {
                //paging
                query = query.OrderBy(d => d.Id).Skip(filter.Page * 5 - 5).Take(5);
            }

            return query.ToArray();
        }

        public int GetNumberOfPages()
        {
            return (int)Math.Ceiling((double)_context.ApartmentDemands.Count() / Constants.Values.PageSize);
        }
    }
}
