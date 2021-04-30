using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Models.Models;

namespace DBRepository.Interfaces
{
    public interface IRepository<T>
    {
        T Get(int id);
        void Post(T entity);

        void Put(T entity);

        void Delete(int id);
        IEnumerable<T> GetAll();

        IEnumerable<T> GetFiltered(Filter filter);
    }
}
