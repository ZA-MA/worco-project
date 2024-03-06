using System.Text.Json.Serialization;

namespace worco_backend.Models
{
    public class ReservationsPlaces
    {
        public int id { get; set; }
        public int? account_id { get; set; }
        public int? place_id { get; set; }
        public int place_number { get; set; }
        public bool is_delete_place { get; set; }
        public string name_map { get; set; }
        public DateTime start_datetime { get; set; }
        public DateTime end_datetime { get; set; }
        public int price { get; set; }
        public bool is_paid { get; set; }
        [JsonIgnore]
        public Account? account { get; set; }
        [JsonIgnore]
        public Place? place { get; set; }
    }
}
