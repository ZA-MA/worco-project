using cosmetic_project_backend.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using worco_backend.Auth;
using worco_backend.Data;
using worco_backend.Models;

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
        public async Task<IActionResult> GetInteractiveMap(HelperTransferModel model)
        {
            using (var serviceScope = ServiceActivator.GetScope())
            {
                var db = serviceScope.ServiceProvider.GetService<AppDbContext>();

                var map = db.Maps
                    .Include(m => m.places)
                        .ThenInclude(p => p.element)
                    .Include(m => m.meetingRooms)
                        .ThenInclude(mr => mr.element)
                    .Include(m => m.offices)
                        .ThenInclude(o => o.element)
                    .Where(m => m.name == model.Info1)
                    /*.Select(m => new Map
                    {
                        id = m.id,
                        name = m.name,
                        activity = m.activity,
                        image = m.image,
                        width = m.width,
                        height = m.height,
                        places = m.places
                            .Select(p => new Place {
                                id = p.id,
                                number_place = p.number_place,
                                element_id = p.element_id,
                                map_id = p.map_id,
                                can_bron = p.can_bron,
                                visible = p.visible,
                                x = p.x,
                                y = p.y,
                                opt_conditioner = p.opt_conditioner,
                                opt_printer = p.opt_printer,
                                opt_scanner = p.opt_scanner,
                                price = p.price,
                                element = new Element
                                {
                                    id = p.element.id,
                                    image = p.element.image,
                                    width = p.element.width,
                                    height = p.element.height,
                                    type = p.element.type,
                                    only_indicator = p.element.only_indicator,
                                    indicator_x = p.element.indicator_x,
                                    indicator_y = p.element.indicator_y,
                                    indicator_size = p.element.indicator_size,
                                }, 
                                //map = p.map
                            })
                            .ToList(),
                        meetingRooms = m.meetingRooms
                            .Select(mr => new MeetingRoom {
                                id = mr.id,
                                number_meeting_room = mr.number_meeting_room,
                                element_id = mr.element.id,
                                map_id = mr.map_id,
                                can_bron = mr.can_bron,
                                visible = mr.visible,
                                x = mr.x,
                                y = mr.y,
                                opt_conditioner = mr.opt_conditioner,
                                opt_projector = mr.opt_projector,
                                opt_soundproof = mr.opt_soundproof,
                                opt_tv = mr.opt_tv,
                                price = mr.price,
                                element =  new Element
                                {
                                    id = mr.element.id,
                                    image = mr.element.image,
                                    width = mr.element.width,
                                    height = mr.element.height,
                                    type = mr.element.type,
                                    only_indicator = mr.element.only_indicator,
                                    indicator_x = mr.element.indicator_x,
                                    indicator_y = mr.element.indicator_y,
                                    indicator_size = mr.element.indicator_size,
                                },
                            })
                            .ToList(),
                        offices = m.offices.Select(o => new Office
                        {
                            id = o.id,
                            number_office = o.number_office,
                            element_id = o.element.id,
                            map_id = o.map_id,
                            can_bron = o.can_bron,
                            visible = o.visible,
                            x = o.x,
                            y = o.y,
                            opt_add_equipment = o.opt_add_equipment,
                            opt_conditioner = o.opt_conditioner,
                            opt_internet = o.opt_internet,
                            opt_printer = o.opt_printer,
                            opt_scanner = o.opt_scanner,
                            opt_video_control = o.opt_video_control,
                            price = o.price,
                            element = new Element
                            {
                                id = o.element.id,
                                image = o.element.image,
                                width = o.element.width,
                                height = o.element.height,
                                type = o.element.type,
                                only_indicator = o.element.only_indicator,
                                indicator_x = o.element.indicator_x,
                                indicator_y = o.element.indicator_y,
                                indicator_size = o.element.indicator_size,
                            },
                        }).ToList(),
                    })*/
                    .FirstOrDefault();
                if (map == null) { return StatusCode(StatusCodes.Status500InternalServerError, new ResponseView { Status = "Error_1", Message = "Map was not found" }); }

                //var places = db.Places.Where(p => p.map_id == map.id).ToList();

                //var placesElements = db.Elements;

                /*var places = map.places.ToList();
                var meetingRooms = map.meetingRooms.ToList();
                var offices = map.offices.ToList();*/

                /*var places = from p in db.Places
                             where p.map_id == map.id
                             join pE in placesElements on p.element_id equals pE.id
                             select new {p.id, p.number_place, p.can_bron, p.visible, p.x, p.y, p.opt_conditioner, p.opt_printer, p.opt_scanner, p.price, pE.image,  pE.width, pE.height, pE.type, pE.only_indicator, pE.indicator_x, pE.indicator_y, pE.indicator_size };

                var meetingRooms = from m in db.MeetingRooms
                             where m.map_id == map.id
                             join pE in placesElements on m.element_id equals pE.id
                             select new { m.id, m.number_meeting_room, m.can_bron, m.visible, m.x, m.y, m.opt_conditioner, m.opt_projector, m.opt_tv, m.opt_soundproof, m.price, pE.image, pE.width, pE.height, pE.type, pE.only_indicator, pE.indicator_x, pE.indicator_y, pE.indicator_size };

                var offices = from o in db.Offices
                                   where o.map_id == map.id
                                   join pE in placesElements on o.element_id equals pE.id
                                   select new { o.id, o.number_office, o.can_bron, o.visible, o.x, o.y, o.opt_conditioner, o.opt_printer, o.opt_scanner, o.opt_video_control, o.opt_internet, o.opt_add_equipment, o.price, pE.image, pE.width, pE.height, pE.type, pE.only_indicator, pE.indicator_x, pE.indicator_y, pE.indicator_size };
*/

                return Ok(new
                {
                    map = map,
                    
                });
            }
        }
    }
}
