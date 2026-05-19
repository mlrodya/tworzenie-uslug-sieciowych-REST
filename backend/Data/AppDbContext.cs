using Microsoft.EntityFrameworkCore;
using AuctionSystem.API.Models;

namespace AuctionSystem.API.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
    }
}