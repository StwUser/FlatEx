using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBRepository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Models.Models;

namespace DBRepository.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly RepositoryContext _context;

        public FileRepository(RepositoryContext context)
        {
            _context = context;
        }

        public async void PostAsync(FileModel file)
        {
            await _context.Files.AddAsync(file);
            await _context.SaveChangesAsync();
        }

        public async void DeleteAsync(string filePath)
        {
            var fileForDelete = _context.Files.FirstOrDefault(f => f.Path == filePath);
            if (fileForDelete != null)
            {
                _context.Files.Remove(fileForDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<FileModel>> GetAll()
        {
            return await _context.Files.ToListAsync();
        }
    }
}
