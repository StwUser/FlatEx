﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Models
{
    public class ApartmentOffer
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public double Square { get; set; }

        public string Address { get; set; }

        public decimal Price { get; set; }

        public bool IsReserved { get; set; }
    }
}
