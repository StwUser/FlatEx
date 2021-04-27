using System;
using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<ApartmentDemand> GetFilteredQuery(ApartmentDemand filter)
        {
            throw new NotImplementedException();
        }

        public void Delete(ApartmentDemand entity)
        {
            _context.ApartmentDemands.Remove(entity);
            _context.SaveChanges();
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
    }
}
