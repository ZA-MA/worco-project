using cosmetic_project_backend.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using worco_backend.Auth;
using worco_backend.Data;
using worco_backend.Models;
using worco_backend.Models.ViewModels;

namespace worco_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [AuthorizeRoles("User", "Admin", "Company")]
    public class InteractiveMap : Controller
    {

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetMaps()
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var maps = db.Maps.Where(m => m.activity == true).ToList();
                if (maps == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Maps not found" }); }

                return Ok(maps);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> GetInteractiveMap(ViewMapId input)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var map = db.Maps
                    .Include(m => m.places)
                        .ThenInclude(p => p.element)
                    .Where(m => m.id == input.map_id)
                    .FirstOrDefault();
                if (map == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Map was not found" }); }

                List<string> options = new List<string> { };

                var allOptions = db.Elements.Select(e => e.options).ToList();

                foreach (var option in allOptions)
                {
                    if (option != null)
                    {
                        string[] o = option.Split(",");
                        foreach (var value in o)
                        {
                            if (!options.Contains(value))
                            {
                                options.Add(value);
                            }
                        }
                    }
                }

                return Ok(new
                {
                    map = map,
                    options = options
                });
            }
        }
    }
}
