using FoodRescue_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodRescue_Backend.Data
{
    public class AppDbContext :DbContext

    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
          : base(options)
        {
        }

        // TABLES ONLY
        public DbSet<User> Users { get; set; }
        public DbSet<FoodListing> FoodListings { get; set; }
        public DbSet<Claim> Claims { get; set; }
    }
}
