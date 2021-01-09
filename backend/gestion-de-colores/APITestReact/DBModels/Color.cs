using System;
using System.Collections.Generic;

namespace APITestReact.DBModels
{
    public partial class Color
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
