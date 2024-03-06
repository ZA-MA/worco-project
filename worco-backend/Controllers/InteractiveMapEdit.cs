using Azure;
using cosmetic_project_backend.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
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

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetMaps()
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var maps = db.Maps.ToList();
                if (maps == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Maps not found" }); }

                return Ok(maps);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> GetInteractiveMap(HelperTransferModel model)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var map = db.Maps
                    .Include(m => m.places)
                        .ThenInclude(p => p.element)
                    .Where(m => m.name == model.Info1)
                    .FirstOrDefault();
                if (map == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Map was not found" }); }

                return Ok(new
                {
                    map = map,

                });
            }
        }

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
                var elements = db.Elements.Include(e => e.places).ToArray();
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

                    var options = elem.options;
                    if (options == "") { options = null; }
                    element.options = options;

                    await db.SaveChangesAsync();
                    return Ok(new { Status = "Success", Message = "Successfully update element." });
                }
                else
                {
                    var options = elem.options;
                    if (options == "") { options = null; }
                    element = new Element
                    {
                        image = elem.image,
                        width = elem.width,
                        height = elem.height,
                        type = elem.type,
                        only_indicator = elem.only_indicator,
                        indicator_x = elem.indicator_x,
                        indicator_y = elem.indicator_y,
                        indicator_size = elem.indicator_size,
                        options = options
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
                .Where(e => e.id == elem.id)
                .FirstOrDefaultAsync();

                if (element == null)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Could not find element." });
                }

                if (element.places.Count == 0)
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
        public async Task<IActionResult> GetPlaceInfo(ViewPlaceId model)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var place = db.Places.Include(p => p.element).Where(p => p.id == model.place_id).FirstOrDefault();
                
                if (place == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Could not find place." }); }

                List<ReservationsPlaces> reservationsPlace = db.ReservationsPlaces.Where(r => r.place_id == place.id).ToList();

                var is_now_bron = false;
                var is_any_bron = false;
                var today = DateTime.Now;
                if(reservationsPlace != null)
                {
                    foreach (ReservationsPlaces rp in reservationsPlace)
                    {
                        if(rp.start_datetime <=  today && today <= rp.end_datetime) { is_now_bron = true; }
                        else if(rp.start_datetime > today) { is_any_bron = true; }
                    }
                }
                
                return Ok(new 
                { 
                    place = place,
                    is_now_bron = is_now_bron,
                    is_any_bron = is_any_bron
                });
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddUpdatePlace(Place _place)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();
                //сделать проверку на позиции
                if (db.Places.Where(p => p.id == _place.id).FirstOrDefault() != null)
                {
                    var place = db.Places.Where(e => e.id == _place.id).FirstOrDefault();
                    place.number_place = _place.number_place;
                    place.can_bron = _place.can_bron;
                    place.visible = _place.visible;
                    place.x = _place.x;
                    place.y = _place.y;
                    place.options = _place.options;
                    place.price = _place.price;

                    await db.SaveChangesAsync();
                    return Ok(new { Status = "Success", Message = "Successfully update place." });
                }
                else
                {
                    var place = new Place
                    {
                        number_place = _place.number_place,
                        can_bron = _place.can_bron,
                        visible = _place.visible,
                        x = _place.x,
                        y = _place.y,
                        options = _place.options,
                        price = _place.price,
                        element = db.Elements.Where(e => e.id == _place.element_id).FirstOrDefault(),
                        map = db.Maps.Where(m => m.id == _place.map_id).FirstOrDefault()
                    };
                    db.Places.Add(place);
                    await db.SaveChangesAsync();
                    return Ok(new { Status = "Success", Message = "Successfully add new place." });
                }
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> DeletePlace(ViewPlaceId model)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var place = db.Places.Where(p => p.id == model.place_id).FirstOrDefault();

                if (place == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Could not find place." }); }

                var reservationPlaceList = db.ReservationsPlaces.Where(p => p.id == model.place_id).ToList();

                if(reservationPlaceList != null) {
                    foreach(ReservationsPlaces rp in reservationPlaceList)
                    {
                        rp.place_id = null;
                        rp.is_delete_place = true;
                    }
                }
                

                db.Places.Remove(place);
                db.SaveChanges();
                
                return Ok(new { Status = "Success", Message = "Success remove." });
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddUpdateMap(Map _map)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                if (db.Maps.Where(m => m.id == _map.id).FirstOrDefault() != null) {
                    var map = db.Maps.Where(m => m.id == _map.id).FirstOrDefault();
                    map.name = _map.name;
                    map.image = _map.image;
                    map.width = _map.width;
                    map.height = _map.height;
                    map.activity = _map.activity;

                    db.SaveChanges();
                    return Ok(new { Status = "Success", Message = "Success update map." });
                }
                else
                {
                    var map = new Map
                    {
                        name = _map.name,
                        image = _map.image,
                        width = _map.width,
                        height = _map.height,
                        activity = _map.activity,
                    };

                    db.Maps.Add(map);
                    db.SaveChanges();
                    return Ok(new { Status = "Success", Message = "Success add new map." });
                }

                
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> DeleteMap(ViewMapId model)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var map = db.Maps.Where(m => m.id == model.map_id).FirstOrDefault();

                if (map == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Could not find map." }); }

                var places = db.Places.Where(p => p.map_id == model.map_id).ToList();

                if(places != null)
                {
                    foreach (Place place in places)
                    {
                        var reservationPlaceList = db.ReservationsPlaces.Where(p => p.id == place.id).ToList();
                        if (reservationPlaceList != null)
                        {
                            foreach (ReservationsPlaces rp in reservationPlaceList)
                            {
                                rp.place_id = null;
                                rp.is_delete_place = true;
                            }
                        }
                    }
                }

                db.Maps.Remove(map);
                db.SaveChanges();

                return Ok(new { Status = "Success", Message = "Success remove map." });
            }
        }
    }
}
