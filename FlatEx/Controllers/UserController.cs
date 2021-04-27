using DBRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlatEx.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IRepository<User> _userRepository;
        public UserController(IRepository<User> uesRepository)
        {
            _userRepository = uesRepository;
        }

        [HttpGet]
        public IEnumerable<User> Index()
        {
            return _userRepository.GetAll();
        }

        [HttpGet("{id}")]
        public User GetUser(int id)
        {
            return _userRepository.Get(id);
        }

        [HttpPost("{id}")]
        public IActionResult CreateUser([FromBody] User user)
        {
            _userRepository.Post(user);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            _userRepository.Put(user);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult DleteUser([FromBody] User user)
        {
            _userRepository.Delete(user);
            return Ok();
        }
    }
}
