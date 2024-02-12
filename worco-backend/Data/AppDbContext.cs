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
        public DbSet<Account> Account { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Maps> Maps { get; set; }
        public DbSet<Places> Places { get; set; }
        public DbSet<MeetingRooms> MeetingRooms { get; set; }
        public DbSet<Offices> Offices { get; set; }
        public DbSet<ReservationsPlaces> ReservationsPlaces { get; set; }
        public DbSet<ReservationsMeetingRooms> ReservationsMeetingRooms { get; set; }
        public DbSet<ReservationsOffices> ReservationsOffices { get; set; }
        public DbSet<Elements> Elements { get; set; }
    }
}
