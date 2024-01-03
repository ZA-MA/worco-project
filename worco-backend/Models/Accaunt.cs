using Microsoft.AspNetCore.Identity;

namespace worco_backend.Models
{
    public class Accaunt
    {
        public int id { get; set; }
        public int login_id { get; set; }
        public int role_id { get; set; }
        
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string patronymic { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
