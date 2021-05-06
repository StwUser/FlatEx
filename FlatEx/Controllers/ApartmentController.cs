using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlatEx.Tools;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace FlatEx.Controllers
{
    public class ApartmentController : Controller
    {
        private readonly IRepository<ApartmentOffer> _apartmentOfferRepository;
        private readonly IRepository<ApartmentDemand> _apartmentDemandRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IWebHostEnvironment _appEnvironment;

        public ApartmentController(IRepository<ApartmentOffer> apartmentOfferRepository, IRepository<ApartmentDemand> apartmentDemandRepository, IFileRepository fileRepository, IWebHostEnvironment appEnvironment)
        {
            _apartmentOfferRepository = apartmentOfferRepository;
            _apartmentDemandRepository = apartmentDemandRepository;
            _fileRepository = fileRepository;
            _appEnvironment = appEnvironment;
        }

        //Offers Part
        [HttpGet]
        [Route("/Apartment/Offers")]
        public IEnumerable<ApartmentOffer> GetAllApartmentOffers([FromQuery]Filter filter)
        {

            if (filter.SquareFrom != null || filter.SquareTo != null || filter.PriceFrom != null || filter.PriceTo != null || filter.Page != 0 || filter.District != null)
            {
                return _apartmentOfferRepository.GetFiltered(filter).Where(a => a.IsReserved == false);
            }

            return _apartmentOfferRepository.GetAll().Where(a => a.IsReserved == false);
        }

        [HttpGet]
        [Route("/Apartment/Offers/GetPagesCount")]
        public int GetOffersPagesCount()
        {
            return _apartmentOfferRepository.GetNumberOfPages();
        }

        [HttpGet]
        [Route("/Apartment/Offers/{userId}")]
        public IEnumerable<ApartmentOffer> GetApartmentOffers(int userId)
        {
            return _apartmentOfferRepository.GetAll().Where(a => a.UserId == userId);
        }

        [HttpPost]
        [Route("/Apartment/Offers")]
        public IActionResult CreateApartmentOffer([FromBody] ApartmentOffer offer)
        {
            _apartmentOfferRepository.Post(offer);
            return Ok();
        }

        [HttpPut]
        [Route("/Apartment/Offers/{userId}")]
        public IActionResult UpdateApartmentOffer([FromBody] ApartmentOffer offer)
        {
            _apartmentOfferRepository.Put(offer);
            return Ok();
        }

        [HttpDelete]
        [Route("/Apartment/Offers/{id}")]
        public IActionResult DeleteApartmentOffer(int id)
        {
            _apartmentOfferRepository.Delete(id);
            return Ok();
        }

        //Demands Part
        [HttpGet]
        [Route("/Apartment/Demands")]
        public IEnumerable<ApartmentDemand> GetAllApartmentDemands([FromQuery] Filter filter)
        {

            if (filter.SquareFrom != null || filter.SquareTo != null || filter.PriceFrom != null || filter.PriceTo != null || filter.Page != 0)
            {
                return _apartmentDemandRepository.GetFiltered(filter).Where(a => a.IsReserved == false);
            }

            return _apartmentDemandRepository.GetAll().Where(a => a.IsReserved == false);
        }

        [HttpGet]
        [Route("/Apartment/Demands/GetPagesCount")]
        public int GetDemandsPagesCount()
        {
            return _apartmentDemandRepository.GetNumberOfPages();
        }

        [HttpGet]
        [Route("/Apartment/Demands/{userId}")]
        public IEnumerable<ApartmentDemand> GetApartmentDemands(int userId)
        {
            return _apartmentDemandRepository.GetAll().Where(a => a.UserId == userId);
        }

        [HttpPost]
        [Route("/Apartment/Demands")]
        public IActionResult CreateApartmentDemand([FromBody] ApartmentDemand demand)
        {
            _apartmentDemandRepository.Post(demand);
            return Ok();
        }

        [HttpPut]
        [Route("/Apartment/Demands/{userId}")]
        public IActionResult UpdateApartmentDemand([FromBody] ApartmentDemand demand)
        {
            _apartmentDemandRepository.Put(demand);
            return Ok();
        }

        [HttpDelete]
        [Route("/Apartment/Demands/{id}")]
        public IActionResult DeleteApartmentDemand(int id)
        {
            _apartmentDemandRepository.Delete(id);
            return Ok();
        }

        // Upload Images
        [HttpPost]
        [Route("/Files/Images/")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile uploadedFile, [FromQuery] int id, string type)
        {
            var photoPath = await FileUploader.UploadFile(_fileRepository, _appEnvironment, uploadedFile);

            if (type.ToLower() == "demands")
            {
                var apartment = _apartmentDemandRepository.Get(id);
                apartment.Photo = photoPath;
                _apartmentDemandRepository.Put(apartment);
            }

            if (type.ToLower() == "offers")
            {
                var apartment = _apartmentOfferRepository.Get(id);
                apartment.Photo = photoPath;
                _apartmentOfferRepository.Put(apartment);
            }

            return Ok();
        }

        [HttpGet]
        [Route("/Files/Images/")]
        public async Task<IActionResult> Index()
        {
            return View(await _fileRepository.GetAll());
        }
    }
}
