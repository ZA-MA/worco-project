namespace worco_backend.Models
{
    public class ReservationsOffices
    {
        public int id { get; set; }
        public int? account_id { get; set; }
        public int? office_id { get; set; }
        public int office_number { get; set; }
        public bool is_delete_office { get; set; }
        public string name_map { get; set; }
        public DateTime start_datetime { get; set; }
        public DateTime end_datetime { get; set; }
        public int price { get; set; }
        public bool is_paid { get; set; }
        public Account? account { get; set; }
        public Office? office { get; set; }
    }
}
