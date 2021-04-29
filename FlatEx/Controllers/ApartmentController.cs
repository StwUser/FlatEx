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

        public ApartmentController(IRepository<ApartmentOffer> apartmentOfferRepository)
        {
            _apartmentOfferRepository = apartmentOfferRepository;
        }

        [HttpGet]
        [Route("/Apartment/Offers/{userId}")]
        public IEnumerable<ApartmentOffer> GetApartmentOffers(int userId)
        {
            return _apartmentOfferRepository.GetAll().Where(a => a.UserId == userId);
        }

        [HttpDelete]
        [Route("/Apartment/Offers/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _apartmentOfferRepository.Delete(id);
            return Ok();
        }
    }
}
