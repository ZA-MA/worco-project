using Microsoft.EntityFrameworkCore;
using System.Drawing;
using worco_backend.Models;
using Newtonsoft.Json;

namespace worco_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Login> Login { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<ReservationsPlaces> ReservationsPlaces { get; set; }
        public DbSet<Element> Elements { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(x => x.login)
                .WithMany()
                .HasForeignKey(x => x.login_id);

            modelBuilder.Entity<User>()
                .HasOne(x => x.role)
                .WithMany()
                .HasForeignKey(x => x.role_id);

            modelBuilder.Entity<Company>()
                .HasOne(x => x.login)
                .WithMany()
                .HasForeignKey(x => x.login_id);

            modelBuilder.Entity<Company>()
                .HasOne(x => x.role)
                .WithMany()
                .HasForeignKey(x => x.role_id);

            modelBuilder.Entity<Map>()
                .HasMany(m => m.places)
                .WithOne(p => p.map)
                .HasForeignKey(p => p.map_id);

            modelBuilder.Entity<Place>()
                .HasOne(x => x.element)
                .WithMany(x => x.places)
                .HasForeignKey(x => x.element_id);

            modelBuilder.Entity<ReservationsPlaces>()
                .HasOne(x => x.place)
                .WithMany(x => x.reservationsPlaces)
                .HasForeignKey(x => x.place_id);
            modelBuilder.Entity<ReservationsPlaces>()
                .HasOne(x => x.account)
                .WithMany(x => x.reservationsPlaces)
                .HasForeignKey(x => x.account_id);

            /*modelBuilder.Entity<Place>()
            .Property(b => b.options)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(x => new Option {
                    name = x.
                })
                .ToList()
            );*/

            modelBuilder.Entity<Place>()
            .Property(p => p.options)
            .HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<Option>>(v) ?? new List<Option>()
            );
        }
    }
}
