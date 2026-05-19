using AuctionSystem.API.Data;
using AuctionSystem.API.Models;

namespace AuctionSystem.API.Repositories
{
    public class BidRepository
    {
        private readonly AppDbContext _context;

        public BidRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Bid bid)
        {
            await _context.Bids.AddAsync(bid);
            await _context.SaveChangesAsync();
        }
    }
}