namespace worco_backend.Models.ViewModels
{
    public class ViewSavePositionPlaces
    {
        public int id { get; set; }
        public int x { get; set; }
        public int y { get; set; }
    }

    public class ViewListPlaces
    {
        public List<Place> ListPlaces { get; set;}
    }

    public class ViewPlaceId { public int place_id { get; set; } }
}
