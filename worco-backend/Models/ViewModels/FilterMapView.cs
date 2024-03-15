namespace worco_backend.Models.ViewModels
{
    public class FilterMapView
    {
        public SelectedTypes? selectedTypes {  get; set; }
        public List<DateOnly>? SelectedDates { get; set; }
        public List<string>? selectedOptions { get; set; }
    }

    public class SelectedTypes
    {
        public bool place { get; set; }
        public bool meetingRoom { get; set; }
        public bool office { get; set; }
    }
}

