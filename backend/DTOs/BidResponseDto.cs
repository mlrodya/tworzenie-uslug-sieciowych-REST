namespace AuctionSystem.API.DTOs
{
    public class BidResponseDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int UserId { get; set; }
        public int AuctionId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
