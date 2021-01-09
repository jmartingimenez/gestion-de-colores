using System;
using System.Collections.Generic;

namespace APITestReact.DBModels
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Contrasenia { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int? Edad { get; set; }
    }
}
