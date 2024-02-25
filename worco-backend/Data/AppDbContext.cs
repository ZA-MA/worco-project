using Microsoft.EntityFrameworkCore;
using System.Drawing;
using worco_backend.Models;

namespace worco_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Login> Login { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<MeetingRoom> MeetingRooms { get; set; }
        public DbSet<Office> Offices { get; set; }
        public DbSet<ReservationsPlaces> ReservationsPlaces { get; set; }
        public DbSet<ReservationsMeetingRooms> ReservationsMeetingRooms { get; set; }
        public DbSet<ReservationsOffices> ReservationsOffices { get; set; }
        public DbSet<Element> Elements { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>()
                .HasOne(x => x.login)
                .WithMany()
                .HasForeignKey(x => x.login_id);

            modelBuilder.Entity<Account>()
                .HasOne(x => x.role)
                .WithMany()
                .HasForeignKey(x => x.role_id);

            modelBuilder.Entity<Map>()
                .HasMany(m => m.places)
                .WithOne(p => p.map)
                .HasForeignKey(p => p.map_id);

            modelBuilder.Entity<Map>()
                .HasMany(m => m.meetingRooms)
                .WithOne(mr => mr.map)
                .HasForeignKey(mr => mr.map_id);

            modelBuilder.Entity<Map>()
                .HasMany(m => m.offices)
                .WithOne(o => o.map)
                .HasForeignKey(o => o.map_id);

            modelBuilder.Entity<Place>()
                .HasOne(x => x.element)
                .WithMany(x => x.places)
                .HasForeignKey(x => x.element_id);

            modelBuilder.Entity<MeetingRoom>()
                .HasOne(x => x.element)
                .WithMany(x => x.meetingRooms)
                .HasForeignKey(x => x.element_id);

            modelBuilder.Entity<Office>()
                 .HasOne(x => x.element)
                 .WithMany(x => x.offices)
                 .HasForeignKey(x => x.element_id);

            modelBuilder.Entity<ReservationsPlaces>()
                .HasOne(x => x.place)
                .WithMany(x => x.reservationsPlaces)
                .HasForeignKey(x => x.place_id);

            modelBuilder.Entity<ReservationsMeetingRooms>()
                .HasOne(x => x.meetingRoom)
                .WithMany(x => x.reservationsMeetingRooms)
                .HasForeignKey(x => x.meeting_room_id);

            modelBuilder.Entity<ReservationsOffices>()
                 .HasOne(x => x.office)
                 .WithMany(x => x.reservationsOffices)
                 .HasForeignKey(x => x.office_id);

        }
    }
}
