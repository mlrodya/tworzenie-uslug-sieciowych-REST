namespace AuctionSystem.API.Models
{
    public class Bid
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int UserId { get; set; }

        public int AuctionId { get; set; }
        public Auction Auction { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}