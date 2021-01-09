using APITestReact.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APITestReact.DAO
{
    public static class ColorDAO
    {
        public static List<Color> GetAll(APITestReactContext context)
        {
            return context.Color
                .ToList(); 
        }

        public static Color Get(APITestReactContext context, string nombre)
        {
            return context.Color
                .Where(c => c.Descripcion.Equals(nombre, StringComparison.OrdinalIgnoreCase))
                .FirstOrDefault();
        }

        public static Color Get(APITestReactContext context, int id)
        {
            return context.Color
                .Where(c => c.Id == id)
                .FirstOrDefault();
        }

        public static Color Add(APITestReactContext context, string nombre)
        {
            Color color = new Color();
            color.Descripcion = nombre;
            color.FechaCreacion = DateTime.Now;

            context.Color.Add(color);
            context.SaveChanges();

            return color;
        }

        public static Color Update(APITestReactContext context, Color color, string nombre)
        {
            color.Descripcion = nombre.ToUpper();
            context.SaveChanges();

            return color;
        }

        public static Color Delete(APITestReactContext context, Color color)
        {
            context.Color.Remove(color);
            context.SaveChanges();

            return color;
        }
    }
}