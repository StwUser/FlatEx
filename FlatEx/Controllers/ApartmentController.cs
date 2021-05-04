using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlatEx.Controllers
{
    [ApiController]
    public class ApartmentController : Controller
    {
        private readonly IRepository<ApartmentOffer> _apartmentOfferRepository;
        private readonly IRepository<ApartmentDemand> _apartmentDemandRepository;

        public ApartmentController(IRepository<ApartmentOffer> apartmentOfferRepository, IRepository<ApartmentDemand> apartmentDemandRepository)
        {
            _apartmentOfferRepository = apartmentOfferRepository;
            _apartmentDemandRepository = apartmentDemandRepository;
        }

        //Offers Part
        [HttpGet]
        [Route("/Apartment/Offers")]
        public IEnumerable<ApartmentOffer> GetAllApartmentOffers([FromQuery]Filter filter)
        {

            if (filter.SquareFrom != null || filter.SquareTo != null || filter.PriceFrom != null || filter.PriceTo != null || filter.Page != 0 || filter.District != null)
            {
                return _apartmentOfferRepository.GetFiltered(filter);
            }

            return _apartmentOfferRepository.GetAll();
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
                return _apartmentDemandRepository.GetFiltered(filter);
            }

            return _apartmentDemandRepository.GetAll();
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

        [HttpDelete]
        [Route("/Apartment/Demands/{id}")]
        public IActionResult DeleteApartmentDemand(int id)
        {
            _apartmentDemandRepository.Delete(id);
            return Ok();
        }
    }
}
