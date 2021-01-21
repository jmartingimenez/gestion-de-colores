using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APITestReact.Attributes;
using APITestReact.DAO;
using APITestReact.DBModels;
using APITestReact.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace APITestReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [LoginAttribute]
    [Produces("application/json")]
    public class ColoresController : ControllerBase
    {
        private APITestReactContext _context;

        public ColoresController(APITestReactContext context)
        {
            _context = context;
        }

        // GET colores/
        [HttpGet]
        public object[] Get()
        {
            List<Color> colores = ColorDAO.GetAll(_context);

            return colores.Select(s => new {
                Id = s.Id,
                Nombre = s.Descripcion,
                Creacion = s.FechaCreacion.ToString("dd/MM/yyyy")
            }).OrderBy(o => o.Nombre).ToArray();
        }

        // GET colores/azul
        [HttpGet("{nombre}")]
        public ActionResult<string> Get(string nombre)
        {
            Color color = ColorDAO.Get(_context, nombre);

            if (color == null) return NotFound("No se encuentra el color buscado.");

            return new JsonResult(new { 
                Id = color.Id,
                Nombre = color.Descripcion,
                Creacion = color.FechaCreacion.ToString("dd/MM/yyyy")
            });
        }

        [HttpPost]
        public ActionResult Post([FromBody] string nombre)
        {
            if (String.IsNullOrEmpty(nombre))
                return BadRequest("Se debe ingresar un nombre de color");

            nombre = nombre.ToUpper();
            Color color = ColorDAO.Get(_context, nombre);
            if (color != null)
                return BadRequest("Este color ya existe. Ingrese uno diferente.");

            ColorDAO.Add(_context, nombre);

            return Ok("Color agregado exitosamente.");
        }

        [HttpPut("editar")]
        public ActionResult Put(int id, [FromBody] string nombre)
        {
            Color color = ColorDAO.Get(_context, id);

            if (color == null)
                return NotFound("No se logró obtener el color que se desea editar.");

            ColorDAO.Update(_context, color, nombre);

            return Ok("Color editado exitosamente.");
        }

        [HttpDelete("eliminar")]
        public ActionResult Delete(IdentificadorDTO identificadorDTO)
        {
            Color color = ColorDAO.Get(_context, identificadorDTO.Id);

            if (color == null) 
                return NotFound("No se logró obtener el color que se desea eliminar.");

            ColorDAO.Delete(_context, color);

            return Ok("Color eliminado exitosamente.");
        }
    }
}