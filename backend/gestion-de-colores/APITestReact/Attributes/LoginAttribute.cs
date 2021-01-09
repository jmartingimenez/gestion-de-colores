using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APITestReact.Attributes
{
    public class LoginAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {

            if (!context.HttpContext.User.Identity.IsAuthenticated)
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    ContentType = "text/plain",
                    Content = "Necesitas autenticarte para acceder.",
                };
        }
    }
}
