using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;

namespace worco_backend.Models
{
    public class Place
    {
        public int id { get; set; }
        public int number_place { get; set; }
        public int element_id { get; set; }
        public int map_id { get; set; }
        public bool can_bron { get; set; }
        public bool visible { get; set; }
        public float x { get; set; }
        public float y { get; set; }
        public List<Option>? options { get; set; }
        public int price { get; set; }
        public Element element { get; set; }
        [JsonIgnore]
        public Map? map { get; set; }
        [JsonIgnore]
        public List<ReservationsPlaces>? reservationsPlaces { get; set; }
    }
    public class Option
    {
        public string option { get; set; }
        public bool active { get; set; }
    }
}
