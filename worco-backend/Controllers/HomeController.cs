using cosmetic_project_backend.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using worco_backend.Data;

namespace worco_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize (Roles = "User")]
    public class HomeController : ControllerBase
    {

        AppDbContext db;
        public HomeController(AppDbContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetL()
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                
                return Ok(db.Login.ToList());
            }
        }

        


    }
}
