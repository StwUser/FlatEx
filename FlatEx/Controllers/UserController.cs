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
    public class UserController : Controller
    {
        private readonly IRepository<User> _userRepository;
        public UserController(IRepository<User> uesRepository)
        {
            _userRepository = uesRepository;
        }


        [HttpGet]
        [Route("/Users")]
        public IEnumerable<User> Index()
        {
            return _userRepository.GetAll();
        }

        [HttpGet]
        [Route("/Login")]
        public int Login(string name, string surname)
        {
            var user = _userRepository.GetAll().FirstOrDefault(u => u.Name == name && u.Surname == surname);
            if(user != null)
                return user.Id;

            return 0;
        }

        [HttpGet]
        [Route("/User/{id}")]
        public User GetUser(int id)
        {
            return _userRepository.Get(id);
        }

        [HttpPost]
        [Route("/User")]
        public IActionResult CreateUser([FromBody] User user)
        {
            _userRepository.Post(user);
            return Ok();
        }

        [HttpPut]
        [Route("/User")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            _userRepository.Put(user);
            return Ok();
        }

        [HttpDelete]
        [Route("/User/{id}")]
        public IActionResult DeleteUser(int id)
        {
            _userRepository.Delete(id);
            return Ok();
        }
    }
}
