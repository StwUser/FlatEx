using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Models.Models;

namespace DBRepository.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly RepositoryContext _context;
        public UserRepository(RepositoryContext context)
        {
            _context = context;
        }

        public void Post(User entity)
        {
            _context.Users.Add(entity);
            _context.SaveChanges();
        }

        public User Get(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public void Delete(int id)
        {
            var entity = _context.Users.FirstOrDefault(u => u.Id == id);

            if (entity != null)
            {
                _context.Users.Remove(entity);
                _context.SaveChanges();
            }
        }

        public void Put(User entity)
        {
            var user = _context.Users.FirstOrDefault(a => a.Id == entity.Id);

            if (user != null)
            {
                _context.Users.Remove(user);
                _context.Users.Add(entity);
                _context.SaveChanges();
            }
        }

        public IEnumerable<User> GetFiltered(Filter filter)
        {
            if(!string.IsNullOrEmpty(filter.Name) && !string.IsNullOrEmpty(filter.Surname))
                return _context.Users.Where(u => u.Name == filter.Name && u.Surname == filter.Surname);

            return _context.Users.ToList();
        }

        public int GetNumberOfPages()
        {
            return (int)Math.Ceiling((double)_context.Users.Count() / Constants.Values.PageSize);
        }
    }
}
