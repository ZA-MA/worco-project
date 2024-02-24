namespace worco_backend.Models.ViewModels
{
    public class ViewAddElement
    {
        public string image { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string type { get; set; }
        public bool only_indicator { get; set; }
        public int indicator_x { get; set; }
        public int indicator_y { get; set; }
        public int indicator_size { get; set; }
    }

    public class ViewDeleteElement
    {
        public int id { get; set; }
    }

}
