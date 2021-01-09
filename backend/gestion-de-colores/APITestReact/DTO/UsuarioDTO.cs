using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace APITestReact.DTO
{
    public class UsuarioDTO
    {
        [Required(ErrorMessage = "Se debe proveer un nombre de usuario.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Se debe proveer una contraseña.")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Se debe proveer un nombre.")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "Se debe proveer un apellido.")]
        public string Apellido { get; set; }
        public int? Edad { get; set; }
    }
}
