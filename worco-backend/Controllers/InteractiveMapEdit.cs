using Azure;
using cosmetic_project_backend.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using worco_backend.Data;
using worco_backend.Models;
using worco_backend.Models.ViewModels;

namespace worco_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class InteractiveMapEdit : Controller
    {
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> SavePositionPlaces(ViewListPlaces model)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();
                var placesNew = model.ListPlaces.ToArray();

                try
                {
                    foreach (var pn in placesNew)
                    {
                        var place = db.Places.Where(p => p.id == pn.id).FirstOrDefault();
                        place.x = pn.x;
                        place.y = pn.y;
                    }
                }
                catch
                {

                }

                db.SaveChanges();

                return Ok();
            }
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetPlacesElements()
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();
                var elements = db.Elements.Include(e => e.places).Include(e => e.meetingRooms).Include(e => e.offices).ToArray();
                /*if (map == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Map was not found" }); }*/

                return Ok(elements);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddUpdateElement(Element elem)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var element = new Element();
                if (db.Elements.Where(e => e.id == elem.id).FirstOrDefault() != null)
                {
                    element = db.Elements.Where(e => e.id == elem.id).FirstOrDefault();
                    element.image = elem.image;
                    element.width = elem.width;
                    element.height = elem.height;
                    element.type = elem.type;
                    element.only_indicator = elem.only_indicator;
                    element.indicator_x = elem.indicator_x;
                    element.indicator_y = elem.indicator_y;
                    element.indicator_size = elem.indicator_size;

                    await db.SaveChangesAsync();
                    return Ok(new { Status = "Success", Message = "Successfully update element." });
                }
                else
                {
                    element = new Element
                    {
                        image = elem.image,
                        width = elem.width,
                        height = elem.height,
                        type = elem.type,
                        only_indicator = elem.only_indicator,
                        indicator_x = elem.indicator_x,
                        indicator_y = elem.indicator_y,
                        indicator_size = elem.indicator_size
                    };
                    db.Elements.Add(element);
                    await db.SaveChangesAsync();
                    return Ok(new { Status = "Success", Message = "Successfully add new element." });
                }
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> DeleteElement(ViewDeleteElement elem)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var element = await db.Elements
                .Include(e => e.places)
                .Include(e => e.meetingRooms)
                .Include(e => e.offices)
                .Where(e => e.id == elem.id)
                .FirstOrDefaultAsync();

                if (element == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Could not find element." });
                }

                if (element.places.Count == 0 && element.meetingRooms.Count == 0 && element.offices.Count == 0)
                {
                    db.Elements.Remove(element);
                    db.SaveChanges();
                    return Ok(new { Status = "Success", Message = "Success remove." });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_2", Message = "It cannot be deleted because the element is used in existing locations." });
                }
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddUpdatePlace(ViewDeleteElement elem)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                return Ok(new { Status = "Success", Message = "Success remove." });
            }
        }
    }
}
