using System.ComponentModel.DataAnnotations;

namespace AuctionSystem.API.DTOs
{
    public class CreateBidDto
    {
        [Range(0.01, 100000000, ErrorMessage = "Kwota oferty musi być większa od zera.")]
        public decimal Amount { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Identyfikator użytkownika jest wymagany.")]
        public int UserId { get; set; }
    }
}
