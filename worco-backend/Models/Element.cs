using System.Text.Json.Serialization;

namespace worco_backend.Models
{
    public class Element
    {
        public int id { get; set; }
        public string? image { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string type { get; set; }
        public bool only_indicator { get; set; }
        public float indicator_x { get; set; }
        public float indicator_y { get; set; }
        public int indicator_size { get; set; }
        public string? options { get; set; }
        [JsonIgnore]
        public List<Place>? places { get; set; }
    }
}
