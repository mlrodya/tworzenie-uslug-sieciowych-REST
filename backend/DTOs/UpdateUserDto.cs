using System.ComponentModel.DataAnnotations;

namespace AuctionSystem.API.DTOs
{
    public class UpdateUserDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana.")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Nazwa użytkownika musi mieć od 3 do 50 znaków.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Adres e-mail jest wymagany.")]
        [EmailAddress(ErrorMessage = "Niepoprawny format adresu e-mail.")]
        public string Email { get; set; }
    }
}
