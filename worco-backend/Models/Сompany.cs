using Microsoft.AspNetCore.Identity;

namespace worco_backend.Models
{
    public class Company
    {
        public int id { get; set; }
        public int login_id { get; set; }
        public int role_id { get; set; }
        
        public string email { get; set; }
        public string phone { get; set; }
        public string name_company { get; set; }
        public string inn { get; set; }
        public string type_company { get; set; }

        public string avatar_url { get; set; }

        public Login login { get; set; }
        public Role role { get; set; }
        public List<ReservationsPlaces>? reservationsPlaces { get; set; }
    }
}
