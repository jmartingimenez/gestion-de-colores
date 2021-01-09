using APITestReact.DBModels;
using APITestReact.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APITestReact.DAO
{
    public static class UsuarioDAO
    {
        public static List<Usuario> GetAll(APITestReactContext context)
        {
            return context.Usuario
                .ToList();
        }

        public static Usuario Get(APITestReactContext context, string username, string password)
        {
            return context.Usuario
                .Where(u => u.Username == username && u.Contrasenia == password)
                .FirstOrDefault();
        }

        public static Usuario Get(APITestReactContext context, string username)
        {
            return context.Usuario
                .Where(u => u.Username == username)
                .FirstOrDefault();
        }

        public static Usuario Get(APITestReactContext context, int id)
        {
            return context.Usuario
                .Where(u => u.Id == id)
                .FirstOrDefault();
        }

        public static Usuario Add(APITestReactContext context, UsuarioDTO usuarioDTO)
        {
            Usuario usuario = new Usuario();
            usuario.Username = usuarioDTO.Username;
            usuario.Contrasenia = usuarioDTO.Password;
            usuario.Nombre = usuarioDTO.Nombre;
            usuario.Apellido = usuarioDTO.Apellido;
            usuario.Edad = usuarioDTO.Edad;

            context.Usuario.Add(usuario);
            context.SaveChanges();

            return usuario;
        }
    }
}
