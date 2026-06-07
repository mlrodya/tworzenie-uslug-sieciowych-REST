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
            return auctions.Select(MapToDto).ToList();
        }

        public async Task<AuctionResponseDto?> GetAuctionById(int id)
        {
            var auction = await _repository.GetByIdAsync(id);
            return auction == null ? null : MapToDto(auction);
        }

        public async Task CreateAuction(CreateAuctionDto dto)
        {
            var auction = new Auction
            {
                Title = dto.Title,
                Description = dto.Description,
                StartingPrice = dto.StartingPrice,
                CurrentPrice = dto.StartingPrice,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.SpecifyKind(dto.EndDate, DateTimeKind.Utc),
                CategoryId = dto.CategoryId,
                OwnerId = dto.OwnerId,
                ImageUrl = dto.ImageUrl
            };

            await _repository.AddAsync(auction);
        }

        public async Task<bool> UpdateAuction(int id, CreateAuctionDto dto)
        {
            var auction = await _repository.GetByIdAsync(id);
            if (auction == null)
                return false;

            auction.Title = dto.Title;
            auction.Description = dto.Description;
            auction.StartingPrice = dto.StartingPrice;
            auction.EndDate = DateTime.SpecifyKind(dto.EndDate, DateTimeKind.Utc);
            auction.CategoryId = dto.CategoryId;
            auction.OwnerId = dto.OwnerId;
            auction.ImageUrl = dto.ImageUrl;

            await _repository.UpdateAsync(auction);
            return true;
        }

        public async Task<bool> DeleteAuction(int id)
        {
            var auction = await _repository.GetByIdAsync(id);
            if (auction == null)
                return false;

            await _repository.DeleteAsync(auction);
            return true;
        }

        public async Task<List<BidResponseDto>?> GetBidHistory(int auctionId)
        {
            var auction = await _repository.GetByIdAsync(auctionId);
            if (auction == null)
                return null;

            var bids = await _bidRepository.GetByAuctionAsync(auctionId);
            return bids.Select(b => new BidResponseDto
            {
                Id = b.Id,
                Amount = b.Amount,
                UserId = b.UserId,
                AuctionId = b.AuctionId,
                CreatedAt = b.CreatedAt
            }).ToList();
        }

        private static AuctionResponseDto MapToDto(Auction a) => new AuctionResponseDto
        {
            Id = a.Id,
            Title = a.Title,
            Description = a.Description,
            StartingPrice = a.StartingPrice,
            CurrentPrice = a.CurrentPrice,
            StartTime = a.StartDate,
            EndTime = a.EndDate,
            CategoryId = a.CategoryId,
            OwnerId = a.OwnerId,
            ImageUrl = a.ImageUrl
        };
    }
}
