namespace worco_backend.Models
{
    public class Map
    {
        public int id { get; set; }

        public string name { get; set; }
        public bool activity { get; set; }
        public string image { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public List<Place>? places { get; set; }
    }
}
