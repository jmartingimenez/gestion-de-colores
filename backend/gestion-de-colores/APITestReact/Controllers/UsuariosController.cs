﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using APITestReact.Attributes;
using APITestReact.DAO;
using APITestReact.DBModels;
using APITestReact.DTO;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APITestReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UsuariosController : ControllerBase
    {
        private APITestReactContext _context;

        public UsuariosController(APITestReactContext context)
        {
            _context = context;
        }

        //GET usuarios/
        [HttpGet]
        public ActionResult Usuarios()
        {
            List<Usuario> usuarios = UsuarioDAO.GetAll(_context);

            return new JsonResult(new
            {
                Usuarios = usuarios.Select(u => new { 
                    Id = u.Id,
                    Username = u.Username,
                    Nombre = u.Nombre,
                    Apellido = u.Apellido,
                    Edad = u.Edad == null ? "Sin definir" : u.Edad.ToString()
                })
            });
        }

        // POST usuarios/login
        [HttpPost("login")]
        public async Task<ActionResult> Login(string username, string password)
        {
            //Si el usuario ya esta logeado no puede acceder
            if (User.Identity.IsAuthenticated)
                return StatusCode(StatusCodes.Status403Forbidden, "Ya estas autenticado.");

            //Comprobando que se enviaron tanto username como password
            if (String.IsNullOrEmpty(username) || String.IsNullOrEmpty(password))
                return BadRequest("Se debe enviar tanto usuario como contraseña.");

            //Obteniendo y comprobando si el usuario existe
            Usuario usuario = UsuarioDAO.Get(_context, username, password);
            if (usuario == null)
                return NotFound("No se encuentra el usuario.");

            //Preparando proceso de autenticación
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return Ok($"Usuario con username '{username}' autenticado exitosamente.");
        }

        [HttpPost("me"), LoginAttribute]
        public ActionResult Data()
        { 
            var claims = User.Claims;
            var claim = claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            var id = claim.Value;

            Usuario usuario = UsuarioDAO.Get(_context, Int32.Parse(id));

            return new JsonResult(new { 
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Username = usuario.Username,
                Edad = usuario.Edad == null ? "Sin definir" : usuario.Edad.ToString()
            });
        }

        // GET usuarios/logout
        [HttpGet("logout"), LoginAttribute]
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok("Sesión cerrada");
        }

        //POST usuarios/add
        [HttpPost("add")]
        public ActionResult Add([FromBody]UsuarioDTO usuarioDTO)
        {
            Usuario usuario = UsuarioDAO.Get(_context, usuarioDTO.Username);

            if (usuario != null)
                return BadRequest("Este nombre de usuario se encuentra en uso.");

            UsuarioDAO.Add(_context, usuarioDTO);

            return Ok("Usuario agregado exitosamente.");
        }
    }
}