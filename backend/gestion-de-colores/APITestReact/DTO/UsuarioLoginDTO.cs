using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APITestReact.DTO
{
    public class UsuarioLoginDTO
    {
        [Required(ErrorMessage = "Se debe proveer un nombre de usuario.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Se debe proveer una contraseña.")]
        public string Password { get; set; }
    }
}
