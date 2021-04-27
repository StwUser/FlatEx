using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IRepository<T>
    {
        T Get(int id);
        void Post(T entity);

        void Put(T entity);

        void Delete(T entity);
        IEnumerable<T> GetAll();

        IEnumerable<T> GetFilteredQuery(T filter);
    }
}
