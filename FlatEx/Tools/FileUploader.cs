using Constants;
using DBRepository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Models.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FlatEx.Tools
{
    public static class FileUploader
    {
        public static async Task<bool> UploadFile(RepositoryContext context, IWebHostEnvironment appEnvironment, IFormFile uploadedFile)
        {
            if (uploadedFile != null)
            {
                string path = Values.FilesPath + uploadedFile.FileName;

                if (uploadedFile.ContentType.Contains(Values.ImageType, StringComparison.CurrentCultureIgnoreCase))
                    path = Values.FilesPathImage + uploadedFile.FileName;

                using (var fileStream = new FileStream(appEnvironment.WebRootPath + path, FileMode.Create))
                {
                    await uploadedFile.CopyToAsync(fileStream);
                }
                FileModel file = new FileModel { Name = uploadedFile.FileName, Path = path };
                await context.Files.AddAsync(file);
                await context.SaveChangesAsync();

                return true;
            }

            return false;
        }

        public static async Task<bool> DeleteImage(RepositoryContext context, IWebHostEnvironment appEnvironment, string filePath)
        {
            if (filePath != null)
            {
                FileInfo fileInf = new FileInfo(appEnvironment.WebRootPath + filePath);
                if (fileInf.Exists)
                {
                    await Task.Run(() => fileInf.Delete());
                }

                var fileForDelete = context.Files.FirstOrDefault(f => f.Path == filePath);
                if (fileForDelete != null)
                {
                    context.Files.Remove(fileForDelete);
                    await context.SaveChangesAsync();
                    return true;
                }

                return false;
            }

            return false;
        }
    }
}
