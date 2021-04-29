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
        public IEnumerable<ApartmentOffer> GetAllApartmentOffers()
        {
            return _apartmentOfferRepository.GetAll();
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
        public IEnumerable<ApartmentDemand> GetAllApartmentDemands()
        {
            return _apartmentDemandRepository.GetAll();
        }

        [HttpGet]
        [Route("/Apartment/Demands/{userId}")]
        public IEnumerable<ApartmentDemand> GetApartmentDemands(int userId)
        {
            return _apartmentDemandRepository.GetAll().Where(a => a.UserId == userId);
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
