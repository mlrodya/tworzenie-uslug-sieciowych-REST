namespace AuctionSystem.API.DTOs
{
    public class AuctionResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal CurrentPrice { get; set; }
        public DateTime EndTime { get; set; }
        public int CategoryId { get; set; }
        public int OwnerId { get; set; }
    }
}
