using Microsoft.EntityFrameworkCore;
using worco_backend.Models;

namespace worco_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Login> Login { get; set; }
        public DbSet<Accaunt> Accaunt { get; set; }
        public DbSet<Roles> Roles { get; set; }
    }
}
