using System.Text.Json.Serialization;

namespace worco_backend.Models
{
    public class MeetingRoom
    {
        public int id { get; set; }
        public int number_meeting_room { get; set; }
        public int element_id { get; set; }
        public int map_id { get; set; }
        public bool can_bron { get; set; }
        public bool visible { get; set; }
        public float x { get; set; }
        public float y { get; set; }
        public bool opt_conditioner { get; set; }
        public bool opt_projector { get; set; }
        public bool opt_tv { get; set; }
        public bool opt_soundproof { get; set; }
        public int price { get; set; }
        public Element element { get; set; }
        [JsonIgnore]
        public Map? map { get; set; }
        [JsonIgnore]
        public List<ReservationsMeetingRooms>? reservationsMeetingRooms { get; set; }
    }
}
