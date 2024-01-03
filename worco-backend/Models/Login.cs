using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace worco_backend.Models
{
    public class Login
    {
        public int id { get; set; }

        public string email { get; set; }
        public string password { get; set; }
        
    }
}
