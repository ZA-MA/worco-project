namespace worco_backend.Models
{
    public class ReservationsOffices
    {
        public int id { get; set; }
        public int account_id { get; set; }
        public int place_id { get; set; }
        public DateTime start_datetime { get; set; }
        public DateTime end_datetime { get; set; }
        public int price { get; set; }
    }
}
