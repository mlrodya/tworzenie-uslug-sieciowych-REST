namespace AuctionSystem.API.Models
{
    public class Auction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal StartingPrice { get; set; }
        public decimal CurrentPrice { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CategoryId { get; set; }
        public int OwnerId { get; set; }
        public string? ImageUrl { get; set; }

        public List<Bid> Bids { get; set; }
    }
}