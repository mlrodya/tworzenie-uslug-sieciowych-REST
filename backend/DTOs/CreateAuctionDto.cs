using System.ComponentModel.DataAnnotations;

namespace AuctionSystem.API.DTOs
{
    public class CreateAuctionDto
    {
        [Required(ErrorMessage = "Nazwa przedmiotu jest wymagana.")]
        [StringLength(120, MinimumLength = 3, ErrorMessage = "Nazwa musi mieć od 3 do 120 znaków.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Opis jest wymagany.")]
        [StringLength(2000, MinimumLength = 5, ErrorMessage = "Opis musi mieć od 5 do 2000 znaków.")]
        public string Description { get; set; }

        [Range(0.01, 1000000, ErrorMessage = "Cena wywoławcza musi być większa od zera.")]
        public decimal StartingPrice { get; set; }

        [Required(ErrorMessage = "Data zakończenia jest wymagana.")]
        public DateTime EndDate { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Kategoria jest wymagana.")]
        public int CategoryId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Identyfikator właściciela jest wymagany.")]
        public int OwnerId { get; set; }

        [Url(ErrorMessage = "Link do zdjęcia musi być poprawnym adresem URL.")]
        public string? ImageUrl { get; set; }
    }
}
