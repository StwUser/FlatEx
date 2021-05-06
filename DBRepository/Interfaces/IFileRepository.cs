using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBRepository.Interfaces
{
    public interface IFileRepository
    {
        void PostAsync(FileModel file);

        void DeleteAsync(string filePath);

        Task<IEnumerable<FileModel>> GetAll();
    }
}
