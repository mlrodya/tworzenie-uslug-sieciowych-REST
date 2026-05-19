namespace AuctionSystem.API.DTOs
{
    public class CreateBidDto
    {
        public decimal Amount { get; set; }
        public int UserId { get; set; }
    }
}