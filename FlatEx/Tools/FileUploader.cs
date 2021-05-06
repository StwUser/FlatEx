using Constants;
using DBRepository;
using DBRepository.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Models.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DBRepository.Interfaces;

namespace FlatEx.Tools
{
    public static class FileUploader
    {
        public static async Task<string> UploadFile(IFileRepository repository, IWebHostEnvironment appEnvironment, IFormFile uploadedFile)
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
                repository.PostAsync(file);

                return path;
            }

            return "error";
        }

        public static async Task<string> DeleteImage(FileRepository repository, IWebHostEnvironment appEnvironment, string filePath)
        {
            if (filePath != null)
            {
                FileInfo fileInf = new FileInfo(appEnvironment.WebRootPath + filePath);
                if (fileInf.Exists)
                {
                    await Task.Run(() => fileInf.Delete());
                }

                repository.DeleteAsync(filePath);

                return filePath;
            }

            return "error";
        }
    }
}
