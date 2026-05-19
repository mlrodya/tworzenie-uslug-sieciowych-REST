using AuctionSystem.API.DTOs;
using AuctionSystem.API.Repositories;
using AuctionSystem.API.Models;


namespace AuctionSystem.API.Services
{
    public class AuctionService
    {
        private readonly AuctionRepository _repository;
        private readonly BidRepository _bidRepository;

        public AuctionService(AuctionRepository repository, BidRepository bidRepository)
        {
            _repository = repository;
            _bidRepository = bidRepository;
        }

        public async Task<(bool Success, string Message)> PlaceBid(int auctionId, CreateBidDto dto)
        {
            var auction = await _repository.GetByIdAsync(auctionId);

            if (auction == null)
                return (false, "Auction not found");

            if (DateTime.UtcNow > auction.EndDate)
                return (false, "Auction has ended");

            if (dto.Amount <= auction.CurrentPrice)
                return (false, "Bid must be higher than current price");

            var bid = new Bid
            {
                Amount = dto.Amount,
                UserId = dto.UserId,
                AuctionId = auctionId,
                CreatedAt = DateTime.UtcNow
            };

            auction.CurrentPrice = dto.Amount;

            await _bidRepository.AddAsync(bid);
            await _repository.UpdateAsync(auction);

            return (true, "Bid placed successfully");
        }

        public async Task<List<AuctionResponseDto>> GetAllAuctions(int page, int pageSize, int? categoryId)
        {
            var auctions = await _repository.GetAllAsync(page, pageSize, categoryId);

            return auctions.Select(a => new AuctionResponseDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                CurrentPrice = a.CurrentPrice,
                EndTime = a.EndDate,
                CategoryId = a.CategoryId,
                OwnerId = a.OwnerId
            }).ToList();
        }

        public async Task CreateAuction(CreateAuctionDto dto)
        {
            var auction = new Auction
            {
                Title = dto.Title,
                Description = dto.Description,
                StartingPrice = dto.StartingPrice,
                CurrentPrice = dto.StartingPrice,
                EndDate = DateTime.SpecifyKind(dto.EndDate, DateTimeKind.Utc),
                CategoryId = dto.CategoryId,
                OwnerId = dto.OwnerId
            };

            await _repository.AddAsync(auction);
        }
    }
}