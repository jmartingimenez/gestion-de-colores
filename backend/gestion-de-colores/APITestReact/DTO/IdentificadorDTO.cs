﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APITestReact.DTO
{
    public class IdentificadorDTO
    {
        [Required]
        public int Id { get; set; }
    }
}
