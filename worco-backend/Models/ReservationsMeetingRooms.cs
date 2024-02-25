namespace worco_backend.Models
{
    public class ReservationsMeetingRooms
    {
        public int id { get; set; }
        public int? account_id { get; set; }
        public int? meeting_room_id { get; set; }
        public int meeting_room_number { get; set; }
        public bool is_delete_meeting_room { get; set; }
        public string name_map { get; set; }
        public DateTime start_datetime { get; set; }
        public DateTime end_datetime { get; set; }
        public int price { get; set; }
        public bool is_paid { get; set; }
        public Account? account { get; set; }
        public MeetingRoom? meetingRoom { get; set; }
    }
}
