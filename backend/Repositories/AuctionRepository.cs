using AuctionSystem.API.Data;
using AuctionSystem.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionSystem.API.Repositories
{
    public class AuctionRepository
    {
        private readonly AppDbContext _context;

        public AuctionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Auction>> GetAllAsync(int page, int pageSize, int? categoryId)
        {
            var query = _context.Auctions.AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(a => a.CategoryId == categoryId);

            return await query
                .OrderByDescending(a => a.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task AddAsync(Auction auction)
        {
            await _context.Auctions.AddAsync(auction);
            await _context.SaveChangesAsync();
        }

        public async Task<Auction?> GetByIdAsync(int id)
        {
            return await _context.Auctions.FindAsync(id);
        }

        public async Task UpdateAsync(Auction auction)
        {
            _context.Auctions.Update(auction);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Auction auction)
        {
            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();
        }
    }
}
